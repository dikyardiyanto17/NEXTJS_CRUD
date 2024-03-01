"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		// await queryInterface.addConstraint("Roles", { onDelete: "cascade", onUpdate: "cascade", fields: ["id"] })
		// await queryInterface.addConstraint("Cities", { onDelete: "cascade", onUpdate: "cascade", fields: ["id"] })
		await queryInterface.addConstraint("Administrators", {
			fields: ["RoleId"],
			type: "foreign key",
			// name: "fk_Administrators_RoleId",
			references: {
				table: "Roles",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("Administrators", {
			fields: ["CityId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Cities",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("Users", {
			fields: ["RoleId"],
			type: "foreign key",
			// name: "fk_Administrators_RoleId",
			references: {
				table: "Roles",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("Users", {
			fields: ["CityId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Cities",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("Users", {
			fields: ["AdministratorId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Administrators",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		// await queryInterface.addConstraint("Users", { onDelete: "cascade", onUpdate: "cascade", fields: ["id", "RoleId", "CityId", "AdministratorId"] })

		await queryInterface.addConstraint("Transactions", {
			fields: ["AdministratorId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Administrators",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("Transactions", {
			fields: ["CityId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Cities",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		// await queryInterface.addConstraint("Transactions", { onDelete: "cascade", onUpdate: "cascade", fields: ["id", "AdministratorId", "CityId"] })

		await queryInterface.addConstraint("TransactionUsers", {
			fields: ["UserId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Users",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})

		await queryInterface.addConstraint("TransactionUsers", {
			fields: ["TransactionId"],
			type: "foreign key",
			// name: "fk_Administrators_CityId",
			references: {
				table: "Transactions",
				field: "id",
				onDelete: "cascade",
				onUpdate: "cascade",
			},
		})
		// await queryInterface.addConstraint("TransactionUsers", { onDelete: "cascade", onUpdate: "cascade", fields: ["id", "UserId", "TransactionId"] })
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		// await queryInterface.removeConstraint("Roles", ["onDelete", "onUpdate"], { fields: ["id"] })
		// await queryInterface.removeConstraint("Cities", ["onDelete", "onUpdate"], { fields: ["id"] })
		// await queryInterface.removeConstraint("Administrators", ["onDelete", "onUpdate"], { fields: ["id", "RoleId", "CityId"] })
		// await queryInterface.removeConstraint("Users", ["onDelete", "onUpdate"], { fields: ["id", "RoleId", "CityId", "AdministratorId"] })
		// await queryInterface.removeConstraint("Transactions", ["onDelete", "onUpdate"], { fields: ["id", "AdministratorId", "CityId"] })
		// await queryInterface.removeConstraint("TransactionUsers", ["onDelete", "onUpdate"], { fields: ["id", "UserId", "TransactionId"] })
	},
}
