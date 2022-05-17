"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const products = sequelize.define("products",
        {
            product_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
            user_id: { type: Sequelize.BIGINT, allowNull: true },
            product_name: { type: DataTypes.STRING(255), allowNull: true },
            product_description: { type: DataTypes.STRING(255), allowNull: true },
            product_price: { type: Sequelize.BIGINT, allowNull: true },
            active: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" },
            blocked: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" },
            createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
        },
        {
            freezeTableName: true,
            timestamps: true
        }
    );

    return products;
};