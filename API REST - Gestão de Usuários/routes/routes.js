var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UsersController = require("../controllers/UsersController");
const AdminAuth = require("../middleware/AdminAuth");
const UserAuth = require("../middleware/UserAuth");

router.get('/', HomeController.index);
router.post("/user", UsersController.create);
router.get("/user",UserAuth, UsersController.allusers);
router.get("/user/:id",UsersController.finduser);
router.put("/user/email/:id",AdminAuth, UsersController.editemail);
router.put("/user/name/:id",AdminAuth, UsersController.editname);
router.put("/user/role/:id",AdminAuth,UsersController.editrole);
router.delete("/user/:id",AdminAuth, UsersController.delete);
router.post("/recoverpassword", UsersController.recoverpassword);
router.post("/newpassword",UsersController.newpassword);
router.post("/login", UsersController.login);
module.exports = router;