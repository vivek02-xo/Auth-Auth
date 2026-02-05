const userService = require("../services/user.js");

async function getUsers(req, res){
    try{
        const users = await userService.getUsers();
        res.json(users);

    }catch(err){
        res.status(500).json({message: `something went wrong ${err}`});
    }
}

module.exports = {getUsers};