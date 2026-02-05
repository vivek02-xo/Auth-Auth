const User = require("../models/user.js");
const bcrypt = require("bcrypt");

async function createAdminFunction(){
    try{
        const existingAdmin = await User.findOne({email : "admin@gmail.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                email: "admin@gmail.com",
                name: "admin",
                password: await bcrypt.hash("admin" , 10),
                role: "admin"
            })
            await newAdmin.save();
            console.log("Admin Created successfully");
        }else{
            console.log("already exist!");
        }
    }catch(err){
        console.log(`Something went wrong ${err}`);
    }
}

module.exports = createAdminFunction;