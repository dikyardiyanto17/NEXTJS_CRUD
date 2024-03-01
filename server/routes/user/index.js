const express = require("express")
const { ControllerUser } = require("../../controllers/table/user")
const authenthication = require("../../middlewares/authenthication")
const router = express.Router()

router.post("/", authenthication, ControllerUser.createUser)
// router.get("/", ControllerUser.findUsers)
router.get("/:id", authenthication, ControllerUser.findUser)
router.put("/:id", ControllerUser.updateUser)
router.delete("/:id", authenthication, ControllerUser.deleteUser)

module.exports = router
