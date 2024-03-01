"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class City extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Administrator, { foreignKey: "CityId", onDelete: "cascade" })
			this.hasMany(models.User, { foreignKey: "CityId", onDelete: "cascade" })
			this.hasMany(models.Transaction, { foreignKey: "CityId", onDelete: "cascade" })
		}
	}
	City.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "City name must be unique",
				},
				validate: {
					notEmpty: {
						msg: "City cannot be empty",
					},
					notNull: {
						msg: "City cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "City",
		}
	)
	return City
}
