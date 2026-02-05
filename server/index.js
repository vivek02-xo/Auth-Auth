require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const signupRoute = require("./routes/signup.js");
const bodyParser = require("body-parser");
const createAdminAccount = require("./scripts/admin.js");
const loginRoute = require("./routes/login.js");

mongoose
  .connect("mongodb://127.0.0.1:27017/auth-auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Something went wrong: ${err}`);
  });
  
app.use(cors());
app.use(bodyParser.json());

createAdminAccount();


app.use("/user", signupRoute);
app.use("/auth", loginRoute );


app.listen(8000, () => {
  console.log("Server is Listening");
});
