const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateUser = (req, res, next) => {
  console.log(req.headers)
  console.log("middle ware function is triggered")
  const token = req.headers['access-token'];

  if (!token) {
    return res.status(401).json({ message: 'Illegal access ' });
  }

  try {
   const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   if(isValid){
    next();
   }
    
  } catch (error) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Invalid token' });
  }
};



module.exports = {
    authenticateUser
}