"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
	class TransactionUser extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Transaction, { onDelete: "cascade" })
			this.belongsTo(models.User, { onDelete: "cascade" })
		}
	}
	TransactionUser.init(
		{
			TransactionId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Transaction Id  cannot be empty",
					},
					notNull: {
						msg: "Transaction Id cannot be null",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "User Id  cannot be empty",
					},
					notNull: {
						msg: "User Id cannot be null",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "TransactionUser",
		}
	)
	return TransactionUser
}
