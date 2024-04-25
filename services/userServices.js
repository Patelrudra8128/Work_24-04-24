const { where, Op } = require('sequelize');
const userTbl = require('../models/userTbl');
const sequelize = require('sequelize');

const createUser = async (reqBody) => {
    return userTbl.create(reqBody);
}

const findUser = async () => {
    // or query
    // return userTbl.findAll({where : {[Op.or] : [{name : 'Rudra'},{name : 'Kenil'}]}});
    return userTbl.findAll();
}

const findUserById = async (id) => {
    return await userTbl.findOne({
        where : {id : id}
    });
}

const removeUser = async (id) => {
    return await userTbl.destroy({
        where : {id : id}
    });
}

const removeAllUser = async () => {
    return await userTbl.truncate();
}

const editUser = async (id,reqBody) => {
    return await userTbl.update(reqBody,
    {
        where : { id : id}
    });
}

// Find particular column
const fetchColumn = async ()=> {
    return await userTbl.findAll({
        attributes : [ 'id', 'name']
    });
}

// As Query
const queries = async ()=> {
    // as query
    // return await userTbl.findAll({
    //     attributes : [ 'id', ['name','first_name']]
    // });

    // count query
    return await userTbl.findAll({
        attributes: [ 'id', ['name','first_name'],
            [sequelize.fn('COUNT', sequelize.col('name')), 'count']
        ]
    });
}

module.exports = {
    createUser,
    findUser,
    findUserById,
    removeUser,
    editUser,
    removeAllUser,
    fetchColumn,
    queries
}