"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Cars", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name_car: {
                type: Sequelize.STRING,
            },
            rent_cost: {
                type: Sequelize.INTEGER,
            },
            image_car: {
                type: Sequelize.STRING,
            },
            id_type: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Type_Cars",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Cars");
    },
};
