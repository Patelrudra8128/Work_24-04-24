const userTbl = require('../models/userTbl');
const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices');

const register = async (req,res) => {
    try {
        const{id,name,email,password,role} = req.body;
        let user = await userServices.createUser({id,name,email,password,role});
        if(user){
            res.json({ message : "User added successfully", status : 1});
        }else{
            res.json({ message : "User not added", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewUser = async (req,res) => {
    try {
        let userData = await userServices.findUser();
        if(userData){
            res.json({ Data : userData, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const viewUserById = async (req,res) => {
    try {
        const reqBody = req.body;
        let userData = await userServices.findUserById(reqBody.id);
        if(userData){
            res.json({ Data : userData, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteUser = async (req,res) => {
    try {
        const reqBody = req.body;
        let delUser = await userServices.removeUser(reqBody.id);
        if(delUser){
            res.json({ message : "User deleted successfully", status : 1});
        }else{
            res.json({ message : "User not deleted", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const deleteAllUser = async (req,res) => {
    try {
        let delUser = await userServices.removeAllUser();
        if(!delUser){
            res.json({ message : "All users deleted successfully", status : 1});
        }else{
            res.json({ message : "User not deleted", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateUser = async (req,res) => {
    try {
        const{name,email,password} = req.body;
        let edUser = await userServices.editUser(req.body.id ,{name,email,password});
        if(edUser){
            res.json({ message : "User updated successfully", status : 1});
        }else{
            res.json({ message : "User not updated", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const login = async (req,res) => {
    try {
        const{email,password} = req.body;
        let loginData = await userTbl.findOne({where : {email : email}});
        if(!loginData || loginData.password != password){
            res.json({ message : "Invalid email or password", status : 0});
        }else{
            const Token = jwt.sign({payload : loginData},'rudra',{expiresIn : '1hr'});
            res.json({ token : Token});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getColumn = async (req,res) => {
    try {
        let useData = await userServices.fetchColumn();
        if(useData){
            res.json({ Data : useData, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

const rawQuery = async (req,res) => {
    try {
        let useData = await userServices.queries();
        if(useData){
            res.json({ Data : useData, status : 1});
        }else{
            res.json({ message : "Data not found", status : 0});
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    register,
    viewUser,
    viewUserById,
    deleteUser,
    deleteAllUser,
    updateUser,
    login,
    getColumn,
    rawQuery
}