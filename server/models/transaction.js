"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Administrator, { onDelete: "cascade" })
			this.belongsTo(models.City, { onDelete: "cascade" })
			this.belongsToMany(models.User, { through: models.TransactionUser, onDelete: "cascade" })
			this.hasMany(models.TransactionUser, { foreignKey: "TransactionId", onDelete: "cascade" })
		}
	}
	Transaction.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Title cannot be empty",
					},
					notNull: {
						msg: "Title cannot be null",
					},
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Status cannot be null",
					},
					notEmpty: {
						msg: "Status cannot be empty",
					},
				},
			},
			transaction_date: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Transaction Date cannot be empty",
					},
					notNull: {
						msg: "Transaction Date cannot be null",
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
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	)
	return Transaction
}
