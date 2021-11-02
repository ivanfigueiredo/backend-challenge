require('dotenv').config();
const bcrypt = require('bcrypt');

const KEY = bcrypt.hashSync(`${process.env.API_KEY}`, 10);

module.exports = {
    private: async (req, res, next) => {
        if(!req.headers.authorization){
            res.status(401).send('notallowed');
            return;
        }
        
        let key = '';
        if(req.headers.authorization){
            key = req.headers.authorization;
        }

        if(key == ''){
            res.status(401).send('notallowed');
            return;
        }

        const checkKEY = await bcrypt.compare(key, KEY);        
        if(!checkKEY){
            res.status(401).send('notallowed');
            return;
        }

        next();

    }
}
