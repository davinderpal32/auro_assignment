const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");

exports.addProduct = async (data) => {
    
    return await Db.products.create(data);
}