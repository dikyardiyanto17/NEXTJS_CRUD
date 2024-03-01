const express = require("express")
const { ControllerRole } = require("../../controllers/table/role")
const router = express.Router()

router.post("/", ControllerRole.createRole)
router.get("/", ControllerRole.findRoles)
router.get("/:id", ControllerRole.findRole)
router.put("/:id", ControllerRole.updateRole)
router.delete("/:id", ControllerRole.deleteRole)

module.exports = router
