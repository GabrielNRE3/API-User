var jwt = require("jsonwebtoken");
var secret = "VHSCGWSCWBJC";

module.exports = function(req,res,next)
{
    const userToken = req.headers['authorization'];

    if(userToken != undefined)
    {
        const bearer = userToken.split(' ');
        var token = bearer[1];

        try
        {
            var decoded = jwt.verify(token,secret, (err,data)=>
            {
                if(err)
                {
                    res.status(401);
                    res.json({err: "Unauthorized user."});
                }else
                {
                    req.token = token;
                    req.loggeduser = {email: data.email, role: data.role}
                    next();
                }
            });
        }catch(err){
            res.status(403);
            res.send("Unauthenticated user.");
            return;
        }
    }else{
        res.status(403);
        res.send("Unauthenticated user.");
        return;
    }
}
