const jwt = require('jsonwebtoken');
const userTbl = require('../models/userTbl');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if(!token){
      return res.json({ message: 'Token is Blank' });
    }
      const finalToken = token.slice(7);
      jwt.verify(finalToken, 'rudra', async(err, decoded) => {
          if (err) {
              console.log(err);
              return res.json({ message: 'Token is not valid' },);
          }
          
          
          let userData = await userTbl.findOne({
            where : {id : decoded.payload.id}
          });
      
          if(!userData){
            res.json({ message : "Email not found"})
            
          }else{
            req.user = decoded; // Store user data in the request object
            next();
          }
      });
  } catch (err) {
      console.log(err);
      return false;
  }
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.payload.role === role) {
          next(); // User has the required role
        } else {
          res.json({ message: 'Access denied' });
        }
      };
}

module.exports = {
    verifyToken,
    checkRole
}