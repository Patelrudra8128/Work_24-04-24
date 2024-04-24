const express = require('express');
const routes = express.Router();
const indexController = require('../controllers/indexController');

routes.post('/register',indexController.register);
routes.get('/viewUser',indexController.viewUser);
routes.get('/viewUserById',indexController.viewUserById);
routes.delete('/deleteUser',indexController.deleteUser);
routes.put('/updateUser',indexController.updateUser);
routes.post('/login',indexController.login);

module.exports = routes;