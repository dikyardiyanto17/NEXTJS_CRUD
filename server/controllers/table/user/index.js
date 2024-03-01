const { Administrator, Role, City, User, Transaction } = require("../../../models")
const { hashPassword } = require("../../../helper/bcrypt")
class ControllerUser {
	static async createUser(req, res, next) {
		try {
			const { username } = req.body

			const { id } = req.user
			const adminstrator = await Administrator.findByPk(id)
			const { title } = req.body
			if (!username) {
				throw { name: "Bad Request", message: "Name Cannot Be Empty" }
			}
			await User.create({
				name: username,
				password: "22222222",
				RoleId: 2,
				CityId: adminstrator.CityId,
				status: true,
				AdministratorId: adminstrator.id,
			})
			await res.status(201).json({ message: "Successfully Creating User" })
		} catch (error) {
			next(error)
		}
	}

	static async findUsers(req, res, next) {
		try {
			const users = await User.findAll({
				include: [
					{
						model: Role,
						attributes: ["name"],
					},
					{
						model: City,
						attributes: ["name"],
					},
					{
						model: Administrator,
						attributes: ["name", "status"],
						include: [
							{
								model: City,
								attributes: ["name"],
							},
						],
					},
					{
						model: Transaction,
						attributes: ["title"],
						through: {
							attributes: [],
						},
					},
				],
				attributes: ["name", "status"],
			})
			await res.status(200).json(users)
		} catch (error) {
			next(error)
		}
	}

	static async findUser(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.user
			if (role !== "Admin") {
				throw { name: "Not Found", message: "Transaction is not found" }
			}
			const user = await User.findByPk(id, {
				include: [
					{
						model: Role,
						attributes: ["name"],
					},
					{
						model: City,
						attributes: ["name"],
					},
					{
						model: Administrator,
						attributes: ["name", "status"],
						include: [
							{
								model: City,
								attributes: ["name"],
							},
						],
					},
					{
						model: Transaction,
						attributes: ["title"],
						through: {
							attributes: [],
						},
					},
				],
				attributes: ["name", "status"],
			})
			if (!user) {
				throw { name: "Not Found", message: "Data Not Found" }
			}
			await res.status(200).json(user)
		} catch (error) {
			next(error)
		}
	}

	static async updateUser(req, res, next) {
		try {
			const { id } = req.params
			const { username } = req.body
			const user = await User.findByPk(id)
			if (!user) {
				throw { name: "Not Found", message: "Data Not Found" }
			}
			await User.update({ name: username }, { where: { id } })
			await res.status(200).json({ message: "Successfully Update User Data" })
		} catch (error) {
			next(error)
		}
	}

	static async deleteUser(req, res, next) {
		try {
			const { id } = req.params
			const user = await User.findByPk(id)
			if (!user) {
				throw { name: "Not Found", message: "Data Not Found" }
			}
			await User.destroy({ where: { id } })
			await res.status(200).json({ message: "Successfully Delete User" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerUser }
