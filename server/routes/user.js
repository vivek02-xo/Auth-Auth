const express = require("express");
const cors = require("cors");
const useController = require("../controllers/user.js");
const authMiddleware = require("../utils/authMiddlewares.js");


const router = express.Router();

router.use(cors());

router.post("/users", authMiddleware.authenticateToken, useController.getUsers)


module.exports = router;