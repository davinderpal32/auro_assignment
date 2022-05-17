const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.addProduct = async (request, response) => {
    try {
        let data = request.body;
        let Details = request.body.Details

        request.checkBody("product_name", ("product_name is required")).notEmpty();
        request.checkBody("product_description", ("product_description is required")).notEmpty();
        request.checkBody("product_price", ("product_price is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        data.user_id = Details.user_id;
        let result = await Services.productServices.addProduct(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "product added successfully", result: result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};