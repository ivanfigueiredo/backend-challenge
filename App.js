const cron = require('node-cron');
const server = require('./server');
require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const User = require('./src/Model/User');

const apiFetchGet = async () => {    
    const res = await fetch(`https://randomuser.me/api/?results=5`,{
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
        console.log("Tabela criada com resposta de erro da API");
        console.log(json.error);
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
}

server.listen(process.env.PORT, ()=>{
    console.log(`Rodando no endereço:  ${process.env.DATABASE}`)  
    
    cron.schedule(`0 0 0 0 *`, function() {  
        apiFetchGet()                        
    });   
            
});



