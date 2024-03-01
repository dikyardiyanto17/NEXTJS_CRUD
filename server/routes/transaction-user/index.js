const express = require("express")
const { ControllerTransactionUser } = require("../../controllers/table/transactionuser")
const router = express.Router()

router.post("/", ControllerTransactionUser.addUserToTransaction)
// router.get("/", ControllerUser.findUsers)
// router.get("/:id", ControllerUser.findUser)
// router.put("/:id", ControllerUser.updateUser)
router.delete("/", ControllerTransactionUser.deleteTransactionUser)

module.exports = router
