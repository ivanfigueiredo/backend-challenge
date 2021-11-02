const User = require('../Model/User');

module.exports = {
    userUpdate: async (req, res) => { 
        try {
            let userId = await req.params.userId.split("="); 
            let {email, password, username} = await req.body;                
                    
            const user = await User.findOne({'login.uuid': userId[1]});        
            
            if(!user){
                res.status(401).send('UUID Invalido!');
                return;
            }                        
            
            let updates = {
                email: `${user.email}`,
                login: {
                    uuid: `${user.login.uuid}`,
                    username: `${user.login.username}`,
                    password: `${user.login.password}`,
                    salt: `${user.login.salt}`,
                    md5: `${user.login.md5}`,
                    shal: `${user.login.shal}`,
                    sha256: `${user.login.sha256}`
                }
            }
            if(email){
                updates.email = email;            
            }

            if(username){
                updates.login.username = username;
            }

            if(password){
                updates.login.password = password
            }
            
            await User.findOneAndUpdate({_id: user._id}, {$set: updates});                                            
            res.status(200).send('OK');   

        } catch (err){
            console.error(err);
            res.status(501).send(err)
        }                                   
        
    },

    info: async (req, res) => {
        try {
            let userId = await req.params.userId.split("=");                                                         
            const user = await User.findOne({'login.uuid': userId[1]}); 
            
            if(!user){
                res.status(401).send('UUID Invalido!');
                return;
            }                                    
            
            res.status(200).send({user});

        } catch (err) {
            console.error(err);
            res.status(501).send(err);
        }              
    },

    remove: async (req, res) => {
        try {
            let userId = await req.params.userId.split("=");
            const user = await User.findOne({'login.uuid': userId[1]});             
            
            if(!user){
                res.status(401).send('UUID Invalido!');               
                return;
            }
            
            await User.findOneAndRemove({_id: user._id});                        
            res.status(200).send('OK');

        } catch (err){
            console.error(err);
            res.status(500).send(err);
        }
    },

    getUSers: async (req, res) => {
        try {
            const {page, perPage} = req.query;
            const options = {
                page: parseInt(page, 1),
                limit: parseInt(perPage, 10),
            };
            
            const users = await User.paginate({}, options);
            res.json({users});

        } catch (err){
            console.error(err);
            res.status(500).send(err);
        }
        
        
    }
}