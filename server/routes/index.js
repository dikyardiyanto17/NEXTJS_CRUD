const express = require("express")
const router = express.Router()

router.use("/token", require("./token"))
router.use("/login", require("./login"))
router.use("/role", require("./role"))
router.use("/city", require("./city"))
router.use("/administrator", require("./administrator"))
router.use("/user", require("./user"))
router.use("/transaction", require("./transaction"))
router.use("/transaction-user", require("./transaction-user"))

module.exports = router
