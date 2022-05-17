const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.login = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("email", ("email is required")).notEmpty();
        request.checkBody("password", ("password is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add sales
        let email = {
            email: data.email
        }
        let userInfo = await Services.userServices.userDetail(email);
        if (userInfo) {
            if (bcrypt.compare(data.password, userInfo.password)) {
                data.access_token = jwt.sign({ id: userInfo.user_id }, process.env.SECRETKEY);
                await Services.userServices.updateRow(data, userInfo);
            } else {
                return response.status(400).json({ success: 0, statusCode: 400, msg: "Incorrect Password", data });
            }
        } else {
            return response.status(400).json({ success: 0, statusCode: 400, msg: "Incorrect Email", data });
        }

        let AppDetail = await Services.userServices.userDetail(email);
        return response.status(200).json({ success: 1, statusCode: 200, msg: "User Logged In Successfully", AppDetail });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};

exports.signup = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("name", ("name is required")).notEmpty();
        request.checkBody("email", ("email is required")).notEmpty();
        request.checkBody("password", ("password is required")).notEmpty();
        request.checkBody("phone_number", ("phone_number is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add sales
        let result = await Services.userServices.addUser(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "Sale added successfully", result: result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};