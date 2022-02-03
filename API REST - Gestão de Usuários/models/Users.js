var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class Users 
{
    async new (name,email,password)
    {
        try
        {
            var hash = await bcrypt.hash(password,12);
            await knex.insert({name,email,password: hash,role: 0}).table("users");
        }catch(err)
        {
            console.log(err);
        }
    }
    async findduplicate (email)
    {
        try
        {
            var conclusion = await knex.select("*").from("users").where({email: email});
            if(conclusion.length > 0)
            {
                return true;
            }else
            {
                return false;
            }
        }catch(err)
        {
            console.log(err);
            return false;
        }
    }
    async findall ()
    {
        try
        {
            var conclusion = await knex.select(["id","name","email","role"]).table("users");
            return conclusion;
        }catch(err)
        {
            console.log(err);
            return [];
        }
    }
    async findbyid (id)
    {
        try
        {
            var conclusion = await knex.select(["id","name","email","role"]).where({id: id}).table("users");
            if(conclusion.length >0)
            {
                return conclusion[0];
            }else
            {
                return {};
            }
        }catch(err)
        {
            console.log(err);
            return undefined;
        } 
    }
    async findbyemail (email)
    {
        try
        {
            var conclusion = await knex.select(["id","name","email","password","role"]).where({email: email}).table("users");
            if(conclusion.length >0)
            {
                return conclusion[0];
            }else
            {
                return undefined;
            }
        }catch(err)
        {
            console.log(err);
            return undefined;
        } 
    }
    async updtemail (id, email)
    {
        var user = await this.findbyid(id);
        if (user != undefined)
        {
            var edituser = {};

            if(email != undefined)
            {
                var conclusion = await this.findduplicate(email);
                if (conclusion == false)
                {
                    edituser.email = email;
                }else
                {
                    return {status: false, err: "Email already in use"}
                }
                try
                {
                    await knex.update(edituser).where({id:id}).table("users");
                    return {status: true}
                }catch(err)
                {
                    return {status: false, err: err}
                }
            }
        }
    }
    async updtname (id, name)
    {
        var user = await this.findbyid(id);
        if (user != undefined)
        {
            var edituser = {};

            if(name != undefined)
            {
                edituser.name = name;
                try
                {
                    await knex.update(edituser).where({id:id}).table("users");
                    return {status: true}
                }catch(err)
                {
                    return {status: false, err: err}
                }
            }
        }
    }
    async updtrole (id, role)
    {
        var user = await this.findbyid(id);
        if (user != undefined)
        {
            var edituser = {};

            if(role != undefined||role >=0||role <2)
            {
                edituser.role = role;
                try
                {
                    await knex.update(edituser).where({id:id}).table("users");
                    return {status: true}
                }catch(err)
                {
                    return {status: false, err: err}
                }
            }
        }
    }
    async deleteuser (id)
    {
        var user = await this.findbyid (id);
        if (user == undefined)
        {
            return {status: false, err: "User not found"}
        }else
        {
            try
            {
                await knex.delete().where({id: id}).table("users");
                return {status: true}
            }catch(err)
            {
                return {status: false, err: err}
            }
        }
    }
    async changepassword(npassword,id,token)
    {
        var hash = await bcrypt.hash(npassword,12);
        await knex.update({password: hash}).where({id:id}).table("users");
        await PasswordToken.consumetoken(token);
    }
}

module.exports = new Users();