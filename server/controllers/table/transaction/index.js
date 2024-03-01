const { City, Transaction, Administrator, TransactionUser, User, Role } = require("../../../models")

class ControllerTransaction {
	static async createTransaction(req, res, next) {
		try {
			const { id } = req.user
			const adminstrator = await Administrator.findByPk(id)
			const { title, users, transaction_date } = req.body
			const transaction = await Transaction.create({
				title,
				AdministratorId: id,
				CityId: adminstrator.CityId,
				status: true,
				transaction_date: new Date(transaction_date),
			})
			const transactionUsers = await users.map((data) => {
				return { UserId: data.userId, TransactionId: transaction.id }
			})

			await TransactionUser.bulkCreate(transactionUsers)
			await res.status(201).json({ message: "Successfully Creating A Transaction" })
		} catch (error) {
			next(error)
		}
	}

	static async findTransactions(req, res, next) {
		try {
			const transactions = await Transaction.findAll({
				include: [
					{
						model: City,
						attributes: ["name"],
					},
					{
						model: Administrator,
						attributes: ["name", "status"],
					},
					{
						model: User,
						through: {
							attributes: [],
						},
						attributes: ["name", "status"],
					},
				],
				attributes: ["title", "status"],
			})
			await res.status(200).json(transactions)
		} catch (error) {
			next(error)
		}
	}

	static async findTransaction(req, res, next) {
		try {
			const { id } = req.params
			const { role } = req.user
			if (role !== "Admin") {
				throw { name: "Not Found", message: "Transaction is not found" }
			}
			const transaction = await Transaction.findByPk(id, {
				include: [
					{
						model: City,
						attributes: ["name"],
					},
					{
						model: Administrator,
						attributes: ["name", "status"],
						include: [
							{
								model: User,
								attributes: ["name", "status", "id"],
							},
						],
					},
					{
						model: User,
						through: {
							attributes: [],
						},
						attributes: ["name", "status", "id"],
					},
				],
				attributes: ["title", "status", "transaction_date"],
			})

			if (!transaction) {
				throw { name: "Not Found", message: "Transaction is not exist" }
			}

			await res.status(200).json(transaction)
		} catch (error) {
			next(error)
		}
	}

	static async updateTransaction(req, res, next) {
		try {
			const { id } = req.params
			const transaction = await Transaction.findByPk(id)
			if (!transaction) {
				throw { name: "Not Found", message: "Transaction is not exist" }
			}
			await Transaction.update(req.body, { where: { id } })
			await TransactionUser.destroy({ where: { TransactionId: transaction.id } })
			const transactionUsers = await req.body.users.map((data) => {
				return { UserId: data.userId, TransactionId: transaction.id }
			})
			await TransactionUser.bulkCreate(transactionUsers)

			await res.status(200).json({ message: "Successfully updating Transaction" })
		} catch (error) {
			next(error)
		}
	}

	static async deleteTransaction(req, res, next) {
		try {
			const { id } = req.params
			const transaction = await Transaction.findByPk(id)
			if (!transaction) {
				throw { name: "Not Found", message: "Transaction is not exist" }
			}
			await Transaction.destroy({ where: { id } })
			await res.status(200).json({ message: "Successfully deleting Transaction" })
		} catch (error) {
			next(error)
		}
	}

	// Public Transaction
	static async findMyTransaction(req, res, next) {
		try {
			const { id, role } = req.user

			if (role == "Admin") {
				const transactions = await Administrator.findByPk(id, {
					include: [
						{
							model: Transaction,
							include: [
								{
									model: User,
									attributes: ["name"],
								},
								{
									model: Administrator,
									attributes: ["name"],
								},
							],
						},
						{
							model: User,
							attributes: ["name", "status", "id"],
							include: [
								{
									model: City,
									attributes: ["name"],
								},
								{
									model: Transaction,
									attributes: ["title"],
								},
							],
						},
						{
							model: Role,
							attributes: ["name"],
						},
					],
					attributes: ["name", "status"],
				})
				if (!transactions) {
					throw { name: "Not Found", message: "Transactions Not Found" }
				}
				// const users = await transactions.getUsers()
				// console.log("- Users : ", users)
				await res.status(200).json(transactions)
			} else if (role == "User") {
				const transactions = await User.findByPk(id, {
					include: [
						{
							model: Transaction,
							through: {
								attributes: [],
							},
							include: [
								{
									model: User,
									attributes: ["name"],
								},
								{
									model: Administrator,
									attributes: ["name"],
								},
							],
						},
						{
							model: Role,
							attributes: ["name"],
						},
						{
							model: Administrator,
							attributes: ["name"],
						},
					],
					attributes: ["name", "status"],
				})
				if (!transactions) {
					throw { name: "Not Found", message: "Transactions Not Found" }
				}
				await res.status(200).json(transactions)
			} else {
				throw { name: "Not Found", message: "Transactions Not Found" }
			}
		} catch (error) {
			next(error)
		}
	}
}

module.exports = { ControllerTransaction }
