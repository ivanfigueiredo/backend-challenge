require('dotenv').config();
const bcrypt = require('bcrypt');

const KEY = bcrypt.hashSync(`${process.env.API_KEY}`, 10);

module.exports = {
    private: async (req, res, next) => {
        if(!req.headers.authorization){
            res.json({notallowed: true});
            return;
        }
        
        let key = '';
        if(req.headers.authorization){
            key = req.headers.authorization;
        }

        if(key == ''){
            res.json({notallowed: true});
            return;
        }

        const checkKEY = await bcrypt.compare(key, KEY);
        console.log(checkKEY);
        if(!checkKEY){
            res.json({notallowed: true});
            return;
        }

        next();

    }
}