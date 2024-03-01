const errorHandler = async (err, req, res, next) => {
	console.log(err)
	switch (err.name) {
		case "SequelizeValidationError":
			const message = err.errors[0].message
			await res.status(400).json({ message })
			break
		case "Bad Request":
			await res.status(400).json({ message: err.message })
			break
		case "Not Found":
			await res.status(404).json({ message: err.message })
			break
		case "Invalid Id":
			await res.status(400).json({ message: err.message })
			break
		case "Is Exist":
			await res.status(409).json({ message: err.message })
			break
		case "Invalid":
			await res.status(401).json({ message: err.message })
			break
		case "Forbidden":
			await res.status(403).json({ message: err.message })
			break
		default:
			await res.status(500).json({ message: "Internal Server Error" })
			break
	}
}

module.exports = errorHandler
