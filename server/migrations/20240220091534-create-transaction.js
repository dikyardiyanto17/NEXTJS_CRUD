"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Transactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			transaction_date: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			AdministratorId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "Administrators",
					},
					key: "id",
				},
			},
			CityId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "Cities",
					},
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
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Transactions")
	},
}
