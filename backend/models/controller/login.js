const db = require('../entity')
const admins = db.admins
const users = db.users
const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require('bcrypt')

const login = async(req,res) =>{
    console.log(req.body);

    try {
        const {email,password} = req.body
        // checking credentials in admin table
        // console.log(email)
        console.log(email,password)
        const adminLoginStatus = await admins.findOne({
            where : {
                email : email
            }
        })
        if(adminLoginStatus){
                let isValidUser = await bcrypt.compare(password,adminLoginStatus.dataValues.password)
                if (isValidUser){
                
                   const jwtAccessToken =  jwt.sign(email,process.env.ACCESS_TOKEN_SECRET)
                //    console.log(jwtAccessToken)
                    res.status(200).json({jsonToken : jwtAccessToken, role : 'admin', message : "login successful as an admin", user : adminLoginStatus})
                }
                else{
                    res.status(400).json({message : "admin authentication failed"})
                }
        }
        else{
            // checking credentials in the user table
            const userLoginStatus = await users.findOne({
                where : {
                    email : email
                }
            })
            if (userLoginStatus){
                   let isValidUser =await bcrypt.compare(password,userLoginStatus.dataValues.password)
                    if (isValidUser){
                        const jwtAccessToken =  jwt.sign(email,process.env.ACCESS_TOKEN_SECRET)
                        // const { password, ...userDetails } = userLoginStatus;
                        res.status(200).json({jsonToken : jwtAccessToken, role : 'user', message : "login successful as a user", user : userLoginStatus})
                    }
                    else{
                       
                        res.status(400).json({message : "user authentication failed"})
                    }
            }else{
                
                res.status(400).json({message : 'details not found'})
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'login Failed' });
    }
}



module.exports = {
    login
}
