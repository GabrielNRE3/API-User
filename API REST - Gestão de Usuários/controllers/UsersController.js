const Users = require("../models/Users");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
//var nodemailer = require("nodemailer");

/*let transporter = nodemailer.createTransport({
    host: "insert email host",
    port: "insert port from the email (gmail, hotmail, etc)",
    secure: "true or false based on the email",
    auth: {
        user:"insert your email",
        password:"insert your password"
    }
}); */

var secret = "VHSCGWSCWBJC";

class UsersController 
{
    async allusers(req,res) 
    {
        var users = await Users.findall();
        res.json(users);
    }

    async create(req,res)
    {
        var {name,email,password} = req.body;
        if(name == ""|| name == undefined)
        {
            res.status (400);
            res.json ({err: "Invalid email."});
            return;
        }
        if(email == ""|| email == undefined)
        {
            res.status (400);
            res.json ({err: "Invalid email."});
            return;
        }

        if(password == ""|| email == undefined)
        {
            res.status (400);
            res.json ({err: "Invalid email."});
            return;
        }

        var emailfound = await Users.findduplicate(email);

        if(emailfound)
        {
            res.status(400);
            res.json({err: "Email already in use"});
            return;
        }

        await Users.new(name,email,password);

        res.status (200);
        res.send("Processing Requisition Body");
    }
    async finduser(req,res)
    {
        var id = req.params.id;
        var user = await Users.findbyid(id);
        if (user != undefined)
        {
            res.status(200);
            res.send(user);
        }else 
        {
            res.status(404);
            return;
        }
    }
    async editemail(req,res)
    {
        var id = req.params.id;
        var {email} = req.body;
        var conclusion = await Users.updtemail(id,email);
        if(conclusion != undefined)
        {
            if(conclusion.status)
            {
                res.send("Sucess.");

            }else
            {
                res.status(406);
                res.send(conclusion.err);
            }
        }else
        {
            res.status(406);
            res.send("Internal error.");
        }
    }
    async editname(req,res)
    {
        var id = req.params.id;
        var {name} = req.body;
        var conclusion = await Users.updtname(id,name);
        if(conclusion != undefined)
        {
            if(conclusion.status)
            {
                res.send("Sucess.");

            }else
            {
                res.status(406);
                res.send(conclusion.err);
            }
        }else
        {
            res.status(406);
            res.send("Internal error.");
        }
    }
    async editrole(req,res)
    {
        var id = req.params.id;
        var {role} = req.body;
        var conclusion = await Users.updtrole(id,role);
        if(conclusion != undefined)
        {
            if(conclusion.status)
            {
                res.send("Sucess.");

            }else
            {
                res.status(406);
                res.send(conclusion.err);
            }
        }else
        {
            res.status(406);
            res.send("Internal error.");
        }
    }
    async delete(req,res)
    {
        var id = req.params.id;
        var conclusion = await Users.deleteuser(id);
        if (conclusion.status)
        {
            res.status(200);
            res.send("Sucess.");

        }else
        {
            res.status(406);
            res.send(conclusion.err);
        }
    }
    async recoverpassword(req,res)
    {
        var email = req.body.email;
        var conclusion = await PasswordToken.generate(email);
        if(conclusion.status)
        {
            res.status (200);
            res.send("" + conclusion.token); //Should send an email to user
            //The email section is commented because of the type of personal info that it requires in order to utilize it
           /* transporter.sendEmail({
                from:"Insert your email",
                to:conclusion.email,
                subject:"Account password recovery",
                text:"Insert a description of the content, including an url to the route /recoverpassword and the token to complete the action",
                html:"If you want to personalize the email you can work with html here"
            })*/
        }else
        {
            res.status(406);
            res.send(conclusion.err);
        }

    }
    async newpassword(req,res)
    {
        var token = req.body.token;
        var password = req.body.password;
        var tkV = await PasswordToken.validation(token);
        if (tkV.status)
        {
            await Users.changepassword(password,tkV.token.userid,tkV.token.token);
            res.status(200);
            res.send("New password aplied");
        }else
        {
            res.status(406);
            res.send("Invalid token");
        }
    }
    async login(req,res)
    {
        var {email,password} = req.body;
        var user = await Users.findbyemail(email);
        if (user != undefined)
        {
            var conclusion = bcrypt.compare(password,user.password);
            if (conclusion)
            {
                res.status(200);
                jwt.sign({ email: user.email, role: user.role },secret,{expiresIn:'8h'}, (err,token)=> 
                {
                    if(err)
                    {
                        res.status(400);
                        res.json({err : "Internal Error"});
                    }else
                    {
                        res.status(200);
                        res.json({token: token});
                    }

                });
                res.json({token: token});
            }else 
            {
                res.status(406);
                res.send("Incorrect login.");
            }
        }else
        {
            res.status(406);
            res.send("Incorrect login.");
        }
    }
}

module.exports = new UsersController();