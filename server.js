require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('./src/Dao/connection');

const routes = require('./src/Routes');

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error("Erro: ", error.message);
});

const server = express();

server.use(cors(
    {
        "origin": "*",
        "methods": "GET, PUT, POST, DELETE",
        "allowedHeaders": "Content-Type, Accept, Authorization"
    }
));
server.use(express.json());
server.use(express.urlencoded({extended: true}));


server.use('/', routes);

module.exports = server;
