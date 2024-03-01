const { comparePassword } = require("../../helper/bcrypt")
const { encodeToken, decodeToken } = require("../../helper/jwt")
const { Administrator, User, Role } = require("../../models")

class ControllerLogin {
	static async login(req, res, next) {
		try {
			const { username, password } = req.body
			if (!username || !password) {
				throw { name: "Invalid", message: "Invalid Access" }
			}

			const isAdmin = await Administrator.findOne({
				where: { name: username },
				include: [{ model: Role, attributes: ["name"] }],
			})

			// const isAdmin = await Administrator.findOne({ where: { name: username } }, { include: [{ model: Role, attributes: [] }] })
			if (isAdmin) {
				const isAdminValidPassword = await comparePassword(password, isAdmin.password)
				if (!isAdminValidPassword) {
					throw { name: "Invalid", message: "Invalid Account" }
				}
				const accessToken = await encodeToken({ id: isAdmin.id, role: isAdmin.Role.name })
				await res.status(200).json({ accessToken, role: isAdmin.Role.name })
			} else {
				const isUser = await User.findOne({
					where: { name: username },
					include: [{ model: Role, attributes: ["name"] }],
				})
				if (isUser) {
					const isUserValidPassword = await comparePassword(password, isUser.password)
					console.log(isUserValidPassword, "<<<<<<<<<<<<<<<")
					if (!isUserValidPassword) {
						throw { name: "Invalid", message: "Invalid Account" }
					}
					const accessToken = await encodeToken({ id: isUser.id, role: isUser.Role.name })
					await res.status(200).json({ accessToken, role: isUser.Role.name })
				} else {
					throw { name: "Invalid", message: "Invalid Account" }
				}
			}
		} catch (error) {
			next(error)
		}
	}

	static async verifyToken(req, res, next) {
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
			await res.status(200).json({ message: "Token is Verified", role: isValid.role })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerLogin }
