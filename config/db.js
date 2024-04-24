const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'company',
    'root',
    '',
    {
        host : 'localhost',
        dialect : 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log("Db is connected");
}).catch((err)=>{
    console.log("Db not connected",err);
})

module.exports = sequelize;