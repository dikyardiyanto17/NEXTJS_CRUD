const express = require("express")
const { ControllerLogin } = require("../../controllers/login")
const router = express.Router()

router.post("/", ControllerLogin.login)

module.exports = router
