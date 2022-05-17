const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("admin_name", ("admin_name is required")).notEmpty();
        request.checkBody("admin_email", ("admin_email is required")).notEmpty();
        request.checkBody("admin_password", ("admin_password is required")).notEmpty();
        request.checkBody("admin_phone_code", ("admin_phone_code is required")).notEmpty();
        request.checkBody("admin_phone_number", ("admin_phone_number is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add sales

        let activeAdmin = await Services.adminServices.activeAdmin();
        if (activeAdmin) {
            return response.status(400).json({ success: 0, statusCode: 400, msg: "Only one admin can be created" });
        }
        let result = await Services.adminServices.createAdmin(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "admin added successfully", result: result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};

exports.loginAdmin = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("admin_email", ("admin_email is required")).notEmpty();
        request.checkBody("admin_password", ("admin_password is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add sales
        let admin_email = {
            admin_email: data.admin_email
        }
        let adminInfo = await Services.adminServices.adminDetail(admin_email);
        if (adminInfo) {
            if (bcrypt.compare(data.admin_password, adminInfo.admin_password)) {
                data.access_token = jwt.sign({ id: adminInfo.admin_id }, process.env.SECRETKEY);
                await Services.adminServices.updateRow(data, adminInfo);
            } else {
                return response.status(400).json({ success: 0, statusCode: 400, msg: "Incorrect Password", data });
            }
        } else {
            return response.status(400).json({ success: 0, statusCode: 400, msg: "Incorrect Email", data });
        }

        let AppDetail = await Services.adminServices.adminDetail(admin_email);
        return response.status(200).json({ success: 1, statusCode: 200, msg: "Admin Logged In Successfully", AppDetail });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};
exports.deleteUserByAdmin = async (request, response) => {
    try {
        let data = request.body;
        request.checkBody("user_id", ("user_id is required")).notEmpty();
        request.checkBody("blocked", ("blocked is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        let user_id = {
            user_id: data.user_id
        }
        let userInfo = await Services.userServices.userDetail(user_id);
        if (userInfo) {
            await Services.userServices.updateRow(data, userInfo);
            let AppDetail = await Services.userServices.userDetail(user_id);
            return response.status(200).json({ success: 1, statusCode: 200, msg: "User Profile Updated Successfully", AppDetail });
        } else {
            return response.status(400).json({ success: 0, statusCode: 400, msg: "User ID Not Found" });
        }
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};

exports.updateUserByAdmin = async (request, response) => {
    try {
        let data = request.body;
        request.checkBody("user_id", ("user_id is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        let user_id = {
            user_id: data.user_id
        }
        let userInfo = await Services.userServices.userDetail(user_id);
        if (userInfo) {
            await Services.userServices.updateRow(data, userInfo);
            let AppDetail = await Services.userServices.userDetail(user_id);
            return response.status(200).json({ success: 1, statusCode: 200, msg: "User Profile Updated Successfully", AppDetail });
        } else {
            return response.status(400).json({ success: 0, statusCode: 400, msg: "User ID Not Found" });
        }

    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};