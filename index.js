const express = require('express');
const port = 2020;
const app = express();
const db = require('./config/db');
const passportJwt = require('./config/passportJWTStrategy');

app.use(express.urlencoded());
app.use(express.json());

app.use('/',require('./routes/indexRoutes'));
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is runnnig on port : "+port);
})