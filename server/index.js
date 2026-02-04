require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const { PORT } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/auth-auth")
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(`Something went wrong: ${err}`);
})


app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);


app.listen(PORT, () => {
    console.log("Server is Listening");
});