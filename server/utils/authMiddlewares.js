const jwt = require("jsonwebtoken");
const {secretKey} = require("../config/jwtConfig.js");

function authenticateToken(req ,res, next){
    const authHeader = req.header("Authorization");
    if(!authHeader){
        return res.status(401).json({massage: "Unauthorized: Missing token!"});
    }

    const [bearer , token] = authHeader.split(" ");
    if(bearer !== "Bearer" || !token){
        return res.status(401).json({massage: "Unauthorized: Invalid token format"});
    }
    jwt.verify(token , secretKey, (err, user) => {
        if(err){
            return res.status(403).json({massege: "Forbindden: Invalid token"});
        }

        req.user = user;
        next();
    })
}


function verifyToken(token){
    return jwt.verify(token, secretKey);
}
module.exports = { authenticateToken , verifyToken};