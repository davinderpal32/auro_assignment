const express = require("express");
const router = express.Router();
const Libs = require(appRoot + "/libs");

const controllers = require(appRoot + "/controllers");

router.post("/createAdmin", controllers.adminController.createAdmin);

router.post("/loginAdmin", controllers.adminController.loginAdmin);

router.post("/updateUserByAdmin", [Libs.middleware.adminLoginRequired], controllers.adminController.updateUserByAdmin);
router.post("/deleteUserByAdmin", [Libs.middleware.adminLoginRequired], controllers.adminController.deleteUserByAdmin);

module.exports = router;