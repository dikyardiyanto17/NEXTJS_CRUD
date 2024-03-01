const express = require("express")
const { ControllerTransaction } = require("../../controllers/table/transaction")
const authenthication = require("../../middlewares/authenthication")
const router = express.Router()

router.get("/", authenthication, ControllerTransaction.findMyTransaction)
router.post("/", authenthication, ControllerTransaction.createTransaction)
// router.get("/", authenthication, ControllerTransaction.findTransactions)
router.get("/:id", authenthication, ControllerTransaction.findTransaction)
router.put("/:id", authenthication, ControllerTransaction.updateTransaction)
router.delete("/:id", authenthication, ControllerTransaction.deleteTransaction)

module.exports = router
