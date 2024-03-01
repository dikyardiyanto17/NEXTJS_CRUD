const express = require("express")
const { ControllerLogin } = require("../../controllers/login")
const router = express.Router()

router.get("/verify", ControllerLogin.verifyToken)

module.exports = router
