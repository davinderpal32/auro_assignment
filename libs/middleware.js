const Services = require(appRoot + "/services");///////////   Services
const Db = require(appRoot + "/models");//////////////////    Db Models
const Libs = require(appRoot + "/libs");//////////////////    Libraries
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

exports.loginInRequired = async (request, response, next) => {
    try {
        let data = request.body;
        let headers = request.headers;
        if (!headers.access_token)
            return response.status(401).json({ success: -3, statusCode: 401, msg: "Your token has expired. Please login first" });

        data.access_token = headers.access_token;

        var Details = await Services.userServices.DetailMiddlewareGet(data.access_token);

        if (!Details)
            return response.status(401).json({ success: -3, statusCode: 401, msg: "Your token has expired. Please login first" });

        //////////////      Blocked Check Cust, Driver, Org Except for Order Routes   //////////////////

        data.Details = Details;

        data.created_at = request.body.created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        next();

    }
    catch (e) {
        console.log("======e===", e);

        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};

exports.adminLoginRequired = async (request, response, next) => {
    try {
        let data = request.body;
        let headers = request.headers;
        if (!headers.access_token)
            return response.status(401).json({ success: -3, statusCode: 401, msg: "Your token has expired. Please login first" });

        data.access_token = headers.access_token;

        var Details = await Services.adminServices.DetailMiddlewareGet(data.access_token);

        if (!Details)
            return response.status(401).json({ success: -3, statusCode: 401, msg: "Your token has expired. Please login first" });

        //////////////      Blocked Check Cust, Driver, Org Except for Order Routes   //////////////////

        data.Details = Details;

        data.created_at = request.body.created_at = moment.utc().format("YYYY-MM-DD HH:mm:ss");
        next();

    }
    catch (e) {
        console.log("======e===", e);

        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};