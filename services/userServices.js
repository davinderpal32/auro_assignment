const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");

exports.listofSales = async (data) => {
    return Db.users.findAll({
        where: {
            blocked: "0"
        }
    });
}

exports.addUser = async (data) => {
    if (data.password)
        data.password = bcrypt.hashSync(data.password, 11);


    return await Db.users.create(data);
}

exports.userDetail = async (data) => {
    return await Db.users.findOne({ where: data });
}

exports.updateRow = async (data, userInfo) => {
    let dataToUpdate = {
        access_token: data.access_token ? data.access_token : userInfo.access_token,
        name: data.name ? data.name : userInfo.name,
        email: data.email ? data.email : userInfo.email,
        password: data.password ? bcrypt.hashSync(data.password, 11) : userInfo.password,
        phone_number: data.phone_number ? data.phone_number : userInfo.phone_number,
        blocked: data.blocked ? data.blocked : userInfo.blocked
    }
    return await Db.users.update(
        dataToUpdate,
        {
            where: { user_id: userInfo.user_id }
        }
    );
}


exports.DetailMiddlewareGet = async (access_token) => {
    return await Db.users.findOne({ where: {access_token : access_token} });
}