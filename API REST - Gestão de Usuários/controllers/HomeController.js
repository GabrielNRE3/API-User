class HomeController{

    async index(req, res){
        res.send("Main Page");
    }

}

module.exports = new HomeController();