const User = require("../models/user.js");

async function getUsers(){
    const users = await User.find({});
    return users
};

module.exports = {getUsers};