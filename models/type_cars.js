"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Type_Cars extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Type_Cars.hasMany(models.Cars, {
                foreignKey: "id_type",
                as: "cars",
            });
        }
    }
    Type_Cars.init(
        {
            type_car: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Type_Cars",
        }
    );
    return Type_Cars;
};
