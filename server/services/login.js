const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {generateToken} = require("../utils/jwtUtils.js");

async function login(email ,password){
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw new Error("user not found");
        }
        const isPasswordValid = bcrypt.compare(password, existingUser.password);
        if(!isPasswordValid){
            throw new Error("Invaild Password!");
        }
        const token = generateToken(existingUser);
        return token;
    }catch(err){
        console.log(`Somwthing went wrong ${err}`);

    }
}

module.exports = {login};