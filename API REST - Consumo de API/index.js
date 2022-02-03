const express = require("express");
const app = express();
const ejs = require("ejs");
const HomeController = require("./controllers/HomeController");
const LoginController = require("./controllers/LoginController");
const RoleController = require("./controllers/RoleController");

app.set('view engine','ejs');

app.use(express.static('public'));

app.use("/", HomeController);
app.use("/", LoginController);
app.use("/", RoleController);

app.listen(4008, ()=> 
{
    console.log("Site on");
});