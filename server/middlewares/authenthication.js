const { decodeToken } = require("../helper/jwt")
const { User, Administrator } = require("../models")

const authenthication = async (req, res, next) => {
	try {
		const { authorization } = req.headers
		const token = authorization && authorization.split(" ")[2]
		if (!token) {
			throw { name: "Forbidden", message: "Forbidden Access" }
		}
		const isValid = await decodeToken(token)
		if (!isValid) {
			throw { name: "Forbidden", message: "Forbidden Access" }
		}

		const { id, role } = isValid
		if (role == "Admin") {
			const administrator = await Administrator.findByPk(id)
			if (!administrator) {
				throw { name: "Forbidden", message: "Invalid Token" }
			}
			req.user = { id: administrator.id, role }
			next()
		} else if (role == "User") {
			const user = await User.findByPk(id)
			if (!user) {
				throw { name: "Forbidden", message: "Invalid Token" }
			}
			req.user = { id: user.id, role }
			next()
		} else {
			throw { name: "Forbidden", message: "Invalid Token" }
		}
	} catch (error) {
		next(error)
	}
}

module.exports = authenthication
