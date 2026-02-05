const authService = require("../services/login.js");


async function login(req,res) {
    try{
        const {email , password} = req.body;
        const token = await authService.login(email, password);

        res.json({token : token});
    }catch(err){
        res.status(401).json({message: "invalid Creadencial"});
    }
}

async function refreshToken(req,res) {
    try{
        const {token} = req.body;
        const newToken = await authService.refreshToken(token);

        res.json({newtoken : newToken});
    }catch(err){
        res.status(401).json({message: "invalid Creadencial"});
    }
}

module.exports= {login , refreshToken};