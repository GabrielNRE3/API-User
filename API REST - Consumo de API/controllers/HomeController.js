const express = require("express");
const router = express.Router();

router.get("/",(req,res)=> 
{
    res.render("initial");
})
router.get("/home",(req,res)=> 
{
    res.render("home");
})
router.get("/showall",(req,res)=> 
{
    res.render("showall");
});


module.exports = router;