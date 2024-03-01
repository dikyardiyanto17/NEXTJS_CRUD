const { City, Transaction, Administrator, User } = require("../../../models")

class ControllerCity {
	static async createCity(req, res, next) {
		try {
			const { name } = req.body
			const isExist = await City.findOne({ where: { name } })
			if (isExist) {
				throw { name: "Is Exist", message: "City Is Already Exist!" }
			}
			await City.create({ name })
			await res.status(201).json({ message: "Successfully Creating A City" })
		} catch (error) {
			next(error)
		}
	}

	static async findCities(req, res, next) {
		try {
			const cities = await City.findAll({
				include: [
					{
						model: Administrator,
						attributes: ["name"],
					},
					{
						model: User,
						attributes: ["name"],
					},
					{
						model: Transaction,
						attributes: ["title"],
					},
				],
				attributes: ["name"],
			})
			await res.status(200).json(cities)
		} catch (error) {
			next(error)
		}
	}

	static async findCity(req, res, next) {
		try {
			const { id } = req.params
			const city = await City.findByPk(id, {
				include: [
					{
						model: Administrator,
						attributes: ["name"],
					},
					{
						model: User,
						attributes: ["name"],
					},
					{
						model: Transaction,
						attributes: ["title"],
					},
				],
				attributes: ["name"],
			})
			if (!city) {
				throw { name: "Not Found", message: "City is not exist" }
			}
			await res.status(200).json(city)
		} catch (error) {
			next(error)
		}
	}

	static async updateCity(req, res, next) {
		try {
			const { id } = req.params
			const city = await City.findByPk(id)
			if (!city) {
				throw { name: "Not Found", message: "City is not exist" }
			}
			await City.update(req.body, { where: { id } })
			await res.status(200).json({ message: "Successfully updating City" })
		} catch (error) {
			next(error)
		}
	}

	static async deleteCity(req, res, next) {
		try {
			const { id } = req.params
			const city = await City.findByPk(id)
			if (!city) {
				throw { name: "Not Found", message: "City is not exist" }
			}
			await City.destroy({ where: { id } })
			await res.status(200).json({ message: "Successfully deleting City" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerCity }
