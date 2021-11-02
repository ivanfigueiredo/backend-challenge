require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const User = require('../Model/User');

export const apiFetchGet = async () => {    
    try {
        const res = await fetch(`https://randomuser.me/api/?results=2000`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });             
        const json = await res.json(); 
            
        if(json.error){
            const newuser = new User({
                imported_t: Date.now(),
                status: User.schema.path('status').options.enum[1]
            });
            await newuser.save();            
            res.status(401).send(json.error);
            return;
        }        
    
        for(let i=0; i < json.results.length; i++){
                    
            const newuser = await new User({            
                gender: json.results[i].gender,
                name: json.results[i].name,
                location: json.results[i].location,
                email: json.results[i].email,
                login: json.results[i].login,
                dob: json.results[i].dob,
                registered: json.results[i].registered,
                phone: json.results[i].phone,
                cell: json.results[i].cell,
                id: json.results[i].id,
                picture: json.results[i].picture,
                nat: json.results[i].nat,
                imported_t: Date.now(),
                status: User.schema.path('status').options.enum[0]
            });    
            await newuser.save();              
        }  
        
        console.log("Tabela criada com sucesso!");
        res.status(200).send('OK');

    } catch (err){
        console.error(err);
        res.status(501).send(err);
    }
}