const userTbl = require('../models/userTbl');
const jwt = require('jsonwebtoken');

const register = async (req,res) => {
    try {
        const{id,name,email,password} = req.body;
        let user = await userTbl.create({
            id : id,
            name: name,
            email : email,
            password : password
        });
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
        let userData = await userTbl.findAll({});
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
        let userData = await userTbl.findOne({where : {id : req.body.id}});
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
        let delUser = await userTbl.destroy({where : {id : req.body.id}});
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

const updateUser = async (req,res) => {
    try {
        const{id,name,email,password} = req.body;
        let edUser = await userTbl.update({
                name : name,
                email: email,
                password : password
            },
            {
                where : { id : id}
            });
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
        let loginData = await userTbl.findOne({email : email});
        if(!loginData || loginData.password != password){
            res.json({ message : "Invalid email or password", status : 0});
        }else{
            const Token = jwt.sign({payload : loginData},'secret',{expiresIn : '1hr'});
            res.json({ token : Token});
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
    updateUser,
    login
}