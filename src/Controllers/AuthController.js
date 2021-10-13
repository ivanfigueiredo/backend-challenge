const User = require('../Model/User');

module.exports = {
    userUpdate: async (req, res) => {        
        let userId = await req.params.userId.split("="); 
        let {email, password, username} = await req.body;                
                  
        const users = await User.find();
        let id = '';

        for(let i=0; i < users.length; i++){
            console.log(users[i].login.uuid);
            console.log(userId[1]);
            if(users[i].login.uuid === userId[1]){
                id = users[i]._id;                
            }
        }      
        
        if(!id){
            res.json({error: 'ID inválido!'});
            return;
        }
                
        const user = await User.findOne({_id: id});
        
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
        
        await User.findOneAndUpdate({_id: id}, {$set: updates});                                            
        res.json({Ok: true});                         
        
    },

    info: async (req, res) => {        
        let userId = await req.params.userId.split("="); 
                                                        
        let users = await User.paginate();                                                                   
        for(let i=0; i < users.docs.length; i++){       
            console.log(users.docs[i].login.uuid)                                                        
            console.log(userId[1])
            if(users.docs[i].login.uuid === userId[1]){
                res.json({user: users.docs[i]});
                return;
            }
        }                                    
        res.json({error: "ID inválido!"});                                      
                                       
    },

    remove: async (req, res) => {
        try{
            let userId = await req.params.userId.split("=");
            const users = await User.find();
            let id = '';

            for(let i=0; i < users.length; i++){
                console.log(users[i].login.uuid);
                console.log(userId[1]);
                if(users[i].login.uuid === userId[1]){
                    id = users[i]._id;                
                }
            }

            if(!id){
                res.json({error: 'ID inválido!'});                
                return;
            }
            
            await User.findOneAndRemove({_id: id});            
            
            res.json({remove: true});
        } catch (err){
            console.error(err);
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