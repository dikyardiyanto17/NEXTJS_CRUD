const { Administrator, Role, City, Transaction } = require("../../../models")
const { hashPassword } = require("../../../helper/bcrypt")
class ControllerAdministrator {
	static async createAdministrator(req, res, next) {
		try {
			const { name, password, CityId } = req.body
			if (!name) {
				throw { name: "Bad Request", message: "Name Cannot Be Empty" }
			}
			if (!password) {
				throw { name: "Bad Request", message: "Password Cannot Be Empty" }
			}
			if (!CityId) {
				throw { name: "Bad Request", message: "City Id Cannot Be Empty" }
			}
			await Administrator.create({ name, password, RoleId: 1, CityId, status: true })
			await res.status(201).json({ message: "Successfully Creating Administrator" })
		} catch (error) {
			next(error)
		}
	}

	static async findAdminstrators(req, res, next) {
		try {
			const administrator = await Administrator.findAll({
				include: [
					{
						model: Role,
						attributes: ["name"],
					},
					{
						model: City,
						attributes: ["name"],
					},
				],
				attributes: ["name", "status"],
			})
			await res.status(200).json(administrator)
		} catch (error) {
			next(error)
		}
	}

	static async findAdminstrator(req, res, next) {
		try {
			const { id } = req.params
			const administrator = await Administrator.findByPk(id, {
				include: [
					{
						model: Role,
						attributes: ["name"],
					},
					{
						model: City,
						attributes: ["name"],
					},
				],
				attributes: ["name", "status"],
			})
			if (!administrator) {
				throw { name: "Not Found", message: "Data Not Found" }
			}
			await res.status(200).json(administrator)
		} catch (error) {
			next(error)
		}
	}

	static async updateAdministrator(req, res, next) {
		try {
			const { id } = req.params
			const administrator = await Administrator.findByPk(id)
			if (!administrator) {
				throw { name: "Not Found", message: "Data Not Found" }
			}
			if (req.body.password == "" || req.body.password.length < 8) {
				throw { name: "Bad Request", message: "Password minimum is 8 character" }
			}
			if (req.body.password) {
				req.body.password = hashPassword(req.body.password)
			}
			await Administrator.update(req.body, { where: { id } })
			await res.status(200).json({ message: "Successfully Update Adminstrator Data" })
		} catch (error) {
			next(error)
		}
	}

	static async deleteAdministrator(req, res, next) {
		try {
			const { id } = req.params
			const administrator = await Administrator.findByPk(id)
			if (!administrator) {
				throw { name: "Not Found", message: "Data Not Found" }
			}

			await Administrator.destroy({ where: { id } })
			await res.status(200).json({ message: "Successfully Delete Administrator" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerAdministrator }
