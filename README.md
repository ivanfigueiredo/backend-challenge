####Back-end Challenge 🏅 2021

##API que importa dados automáticos da API de testes: https://randomuser.me/api.

##O backend foi desenvolvido em NodeJS.

#Baixar o Node em https://nodejs.org./en/ - Baixar versão LTS.

Testando o node e o npm pelo prompt de comandos:

node -v

npm --version

Instalar bibliotecas que auxiliarão nas configurações do servidor:

1 - Express:
 npm install express --save
2 - Cors:
 npm install cors --save
3 - Jest:
 npm install jest --save
4 - Mongoose:
 npm install mongoose --save
5 - Cron:
 npm install node-cron
6 - Mongoose-paginate:
 npm install mongoose-paginate --save
7 - Node-fetch:
 npm install node-fetch
8 - Nodemon:
 npm install nodemon --save
9 - Dotenv:
 npm install dotenv --save
10 - Bcrypt:
 npm install --save

 Baixar o MongoDB em https://www.mongodb.com/try/download/community. Baixar a Current.
 Criar um banco com nome de challenge.
 Não foi inserido usuário e senha.
 Criar uma collection chamada users. (O MongoDB exige que uma collection seja criada)

Configurações da variável de ambiente:
PORT=3000
DATABASE=mongodb://127.0.0.1:27017/challenge
API_KEY=1101202526  

A key de autenticação será passada pelo Headers:

 headers: {
     Authorization: `${API_KEY}`
 }

 Acessar https://resttesttest.com/ --> Add header --> 
 header Name: Authorization
 Header Value: 1101202526
(Isso serve para testar a API)

Para rodar o projeto é preciso executar este comando no prompt ou shell:
npm run startdev
 
O projeto ficará rodando ativamente pelo nodemon.

Para realizar os testes das funções do Controller e middleware, executar o seguinte comando pelo prompt ou shell:
npm run test