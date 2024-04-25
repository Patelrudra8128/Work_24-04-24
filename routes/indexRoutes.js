const express = require('express');
const routes = express.Router();
const indexController = require('../controllers/indexController');
const passport = require('passport');
const { verifyToken } = require('../config/passportJWTStrategy');
const { checkRole } = require('../config/passportJWTStrategy');

routes.post('/register',indexController.register);
routes.get('/viewUser',verifyToken,checkRole('admin'),indexController.viewUser);
routes.get('/viewUserById',indexController.viewUserById);
routes.delete('/deleteUser',indexController.deleteUser);
routes.delete('/deleteAllUser',indexController.deleteAllUser);
routes.put('/updateUser',indexController.updateUser);
routes.post('/login',indexController.login);

routes.get('/getColumn',indexController.getColumn);
routes.get('/rawQuery',indexController.rawQuery);

module.exports = routes;    