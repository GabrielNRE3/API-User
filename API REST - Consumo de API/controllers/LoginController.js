const express = require("express");
const router = express.Router();

router.get("/create",(req,res)=> {
    res.render("create");
})

router.get("/login", (req,res)=> {
    res.render("login");
})
module.exports = router;