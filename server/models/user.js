"use strict"
const { Model } = require("sequelize")
const { hashPassword } = require("../helper/bcrypt")
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Role, { onDelete: "cascade" })
			this.belongsTo(models.City, { onDelete: "cascade" })
			this.belongsTo(models.Administrator, { onDelete: "cascade" })
			this.belongsToMany(models.Transaction, { through: models.TransactionUser, onDelete: "cascade" })
			this.hasMany(models.TransactionUser, { foreignKey: "UserId", onDelete: "cascade" })
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Name cannot be empty",
					},
					notNull: {
						msg: "Name cannot be null",
					},
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Status cannot be empty",
					},
					notNull: {
						msg: "Status cannot be null",
					},
				},
			},
			password: {
				type: DataTypes.TEXT,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password cannot be null",
					},
					notEmpty: {
						msg: "Password cannot be empty",
					},
					len: {
						args: [8],
						msg: "Minimum password is 8 character",
					},
				},
			},
			RoleId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Role Id cannot be empty",
					},
					notNull: {
						msg: "Role Id cannot be null",
					},
				},
			},
			CityId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "City Id cannot be empty",
					},
					notNull: {
						msg: "City Id cannot be null",
					},
				},
			},
			AdministratorId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Administrator Id cannot be empty",
					},
					notNull: {
						msg: "Administrator Id cannot be null",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: (instance, option) => {
					instance.password = hashPassword(instance.password)
				},
			},
		}
	)
	return User
}
