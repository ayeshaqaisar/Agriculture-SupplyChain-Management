// require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const cookie = require('cookie-parser')
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
const cors = require("cors");

const farmerRegisterRouter = require("./routes/farmerRegister");
const farmerRouter = require("./routes/farmer");
const customerRegisterRouter = require("./routes/customerRegister");
const customerRouter = require("./routes/customer");
const distributorRegisterRouter = require("./routes/distributorRegister");
const distributorRouter = require("./routes/distributor");



const app = express();
app.use(express.json())
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookie())

const DB_NAME = "agrichainDB";

mongoose.connect("mongodb://localhost:27017/agrichainDB", {
  useUnifiedTopology: true, 
  useNewUrlParser: true
});

// mongoose.set("useCreateIndex", true);
const db = mongoose.connection; //access to the pending connection
db.on("error", (err) => {
  console.log(`Error in DB connection`);
  console.error(err);
});
db.once("open", () => {
  console.log(`Connected to the database : ${DB_NAME}`);
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

// Routes START
app.use("/farmerLogin", farmerRouter);
app.use("/farmerRegister", farmerRegisterRouter);
app.use("/customerLogin", customerRouter);
app.use("/customerRegister", customerRegisterRouter);
app.use("/distributorLogin", distributorRouter);
app.use("/distributorRegister", distributorRegisterRouter);

app.listen(5000, function() {
    console.log("Server started on port 5000.");
});
  
