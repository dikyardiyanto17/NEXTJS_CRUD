const { Role, Administrator, User } = require("../../../models")

class ControllerRole {
	static async createRole(req, res, next) {
		try {
			const { name } = req.body
			const isExist = await Role.findOne({ where: { name } })
			if (isExist) {
				throw { name: "Is Exist", message: "Role Is Already Exist!" }
			}
			await Role.create({ name })
			await res.status(201).json({ message: "Successfully Creating A Role" })
		} catch (error) {
			next(error)
		}
	}

	static async findRoles(req, res, next) {
		try {
			const roles = await Role.findAll({
				include: [
					{
						model: Administrator,
						attributes: ["name"],
					},
					{
						model: User,
						attributes: ["name"],
					},
				],
				attributes: ["name"],
			})
			await res.status(200).json(roles)
		} catch (error) {
			next(error)
		}
	}

	static async findRole(req, res, next) {
		try {
			const { id } = req.params
			const role = await Role.findByPk(id, {
				include: [
					{
						model: Administrator,
						attributes: ["name"],
					},
					{
						model: User,
						attributes: ["name"],
					},
				],
				attributes: ["name"],
			})
			if (!role) {
				throw { name: "Not Found", message: "Role is not exist" }
			}
			await res.status(200).json(role)
		} catch (error) {
			next(error)
		}
	}

	static async updateRole(req, res, next) {
		try {
			const { id } = req.params
			const role = await Role.findByPk(id)
			if (!role) {
				throw { name: "Not Found", message: "Role is not exist" }
			}
			await Role.update(req.body, { where: { id } })
			await res.status(200).json({ message: "Successfully updating role" })
		} catch (error) {
			next(error)
		}
	}

	static async deleteRole(req, res, next) {
		try {
			const { id } = req.params
			const role = await Role.findByPk(id)
			if (!role) {
				throw { name: "Not Found", message: "Role is not exist" }
			}
			await Role.destroy({ where: { id } })
			await res.status(200).json({ message: "Successfully updating role" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerRole }
