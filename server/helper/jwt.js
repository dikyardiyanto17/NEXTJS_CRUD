const jwt = require("jsonwebtoken")
const strikeFreedom = process.env.JWT_SECRET

const encodeToken = (payload) => {
	return jwt.sign(payload, strikeFreedom)
}

const decodeToken = (token) => {
	return jwt.verify(token, strikeFreedom)
}

module.exports = { encodeToken, decodeToken }