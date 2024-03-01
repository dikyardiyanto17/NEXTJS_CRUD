"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Role extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Administrator, { foreignKey: "RoleId", onDelete: "cascade" })
			this.hasMany(models.User, { foreignKey: "RoleId", onDelete: "cascade" })
		}
	}
	Role.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: "Role name must be uniquee",
				},
				validate: {
					notEmpty: {
						msg: "Role cannot be empty",
					},
					notNull: {
						msg: "Role cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Role",
		}
	)
	return Role
}
