var knex = require("../database/connection");
var Users = require("./Users");

class PasswordToken 
{
    async generate(email)
    {
        var user = await Users.findbyemail(email);
        if (user != undefined)
        {
            try
            {
                var token = Date.now(); // Could use UUID for a more precise method 
                await knex.insert({
                    userid: user.id,
                    used: 0,
                    token: token
                }).table("passwordtoken");
                return {status: true, token: token, email: user.email}
            }catch(err)
            {
                console.log(err);
                return {status: false, err:err}
            }

        }else 
        {
            return {status: false, err:"Unused email"}
        }
    }
    async validation(token)
    {
        try
        {
            var conclusion = await knex.select().where({token: token}).table("passwordtoken");
            if (conclusion.length >0)
            {
                var tk = conclusion[0];
                if(tk.used)
                {
                    return {status: false};
                }else
                {
                    return {status: true,token: tk};
                }
            }else
            {
                return {status: false};
            }
        }catch(err)
        {
            console.log(err);
            return {status: false};
        }
       

    }
    async consumetoken(token)
    {
        await knex.update({used: 1}).where({token: token}).table("passwordtoken");
        
    }
}

module.exports = new PasswordToken();