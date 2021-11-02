const cron = require('node-cron');
const server = require('./server');
const { apiFetchGet } = require('./src/helpers/API');

server.listen(process.env.PORT, ()=>{
    console.log(`Rodando no endereço:  ${process.env.DATABASE}`)  
    
    cron.schedule(`00 30 11 * * 0-6`, function() {                          
        apiFetchGet()
    });   
            
});
