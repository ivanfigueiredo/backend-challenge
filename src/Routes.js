const express = require('express');
const routes = express.Router();

const AuthController = require('./Controllers/AuthController');

const Auth = require('./middlewares/auth');

routes.post('/', (req, res) =>{        
    res.json("REST Back-end Challenge 20211007 Running")        
});
routes.put('/users:userId', Auth.private, AuthController.userUpdate);
routes.delete('/users:userId', Auth.private, AuthController.remove);
routes.get('/users:userId', Auth.private, AuthController.info);
routes.get('/users', AuthController.getUSers);




module.exports = routes;