const express = require("express");
const router = express.Router();
const Libs = require(appRoot + "/libs");

const controllers = require(appRoot + "/controllers");

//API to add data into sales table
router.post("/addProduct", [Libs.middleware.loginInRequired], controllers.productController.addProduct);

//API to fetch stats from the sales
// router.get("/addProduct", [Libs.middleware.loginInRequired], controllers.saleController.salesReport);

module.exports = router;