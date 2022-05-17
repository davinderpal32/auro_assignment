"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const admins = sequelize.define("admins",
        {
            admin_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
            admin_name: { type: DataTypes.STRING(255), allowNull: true },
            admin_email: { type: DataTypes.STRING(255), allowNull: true },
            admin_password: { type: DataTypes.STRING(255), allowNull: true },
            admin_phone_code: { type: Sequelize.BIGINT, allowNull: true },
            admin_phone_number: { type: Sequelize.BIGINT, allowNull: true },
            access_token: { type: DataTypes.STRING(255), allowNull: true },
            blocked: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" },
            active: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" }
        }
    );

    return admins;
};