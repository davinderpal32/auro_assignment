const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");



exports.createAdmin = async (data) => {
    if (data.admin_password)
        data.admin_password = bcrypt.hashSync(data.admin_password, 11);


    return await Db.admins.create(data);
}

exports.activeAdmin = async () => {
    return await Db.admins.findOne({ where: {active:"1"} });
}
exports.adminDetail = async (data) => {
    return await Db.admins.findOne({ where: data });
}


exports.DetailMiddlewareGet = async (access_token) => {
    return await Db.admins.findOne({ where: {access_token : access_token} });
}

exports.updateRow = async (data, adminInfo) => {
    let dataToUpdate = {
        access_token: data.access_token ? data.access_token : userInfo.access_token
    }
    return await Db.admins.update(
        dataToUpdate,
        {
            where: { admin_id: adminInfo.admin_id }
        }
    );
}