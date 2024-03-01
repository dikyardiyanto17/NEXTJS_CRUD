const express = require("express")
const { ControllerAdministrator } = require("../../controllers/table/administrator")
const router = express.Router()

router.post("/", ControllerAdministrator.createAdministrator)
router.get("/", ControllerAdministrator.findAdminstrators)
router.get("/:id", ControllerAdministrator.findAdminstrator)
router.put("/:id", ControllerAdministrator.updateAdministrator)
router.delete("/:id", ControllerAdministrator.deleteAdministrator)

module.exports = router
