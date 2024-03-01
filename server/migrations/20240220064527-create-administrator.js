"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Administrators", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			RoleId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: {
						tableName: "Roles",
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
			status: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
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
		await queryInterface.dropTable("Administrators")
	},
}
