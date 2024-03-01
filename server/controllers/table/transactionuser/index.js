const { City, Transaction, Administrator, TransactionUser } = require("../../../models")

class ControllerTransactionUser {
	static async addUserToTransaction(req, res, next) {
		try {
			const { UserId, TransactionId } = req.body
			const isExist = await TransactionUser.findOne({
				where: {
					UserId,
					TransactionId,
				},
			})
			if (isExist) {
				throw { name: "Is Exist", message: "User is already in this transaction" }
			}
			await TransactionUser.create({ UserId, TransactionId })
			await res.status(201).json({ message: "Successfully Adding User to the Transaction" })
		} catch (error) {
			next(error)
		}
	}

	// static async findTransactions(req, res, next) {
	// 	try {
	// 		const transactions = await Transaction.findAll({
	// 			include: [
	// 				{
	// 					model: City,
	// 					attributes: ["name"],
	// 				},
	// 				{
	// 					model: Administrator,
	// 					attributes: ["name", "status"],
	// 				},
	// 			],
	// 			attributes: ["title", "status"],
	// 		})
	// 		await res.status(200).json(transactions)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	// static async findTransaction(req, res, next) {
	// 	try {
	// 		const { id } = req.params
	// 		const transaction = await Transaction.findByPk(id, {
	// 			include: [
	// 				{
	// 					model: City,
	// 					attributes: ["name"],
	// 				},
	// 				{
	// 					model: Administrator,
	// 					attributes: ["name", "status"],
	// 				},
	// 			],
	// 			attributes: ["title", "status"],
	// 		})
	// 		if (!transaction) {
	// 			throw { name: "Not Found", message: "Transaction is not exist" }
	// 		}
	// 		await res.status(200).json(transaction)
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	// static async updateTransaction(req, res, next) {
	// 	try {
	// 		const { id } = req.params
	// 		const transaction = await Transaction.findByPk(id)
	// 		if (!transaction) {
	// 			throw { name: "Not Found", message: "Transaction is not exist" }
	// 		}
	// 		await Transaction.update(req.body, { where: { id } })
	// 		await res.status(200).json({ message: "Successfully updating Transaction" })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }

	static async deleteTransactionUser(req, res, next) {
		try {
			const { UserId, TransactionId } = req.body
			const isExist = await TransactionUser.findOne({
				where: {
					UserId,
					TransactionId,
				},
			})
			if (!isExist) {
				throw { name: "Not Found", message: "Data is not exist" }
			}
			await TransactionUser.destroy({ where: { UserId, TransactionId } })
			await res.status(200).json({ message: "Successfully Deleting Data" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerTransactionUser }
