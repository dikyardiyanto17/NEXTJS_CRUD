const express = require("express")
const { ControllerCity } = require("../../controllers/table/city")
const router = express.Router()

router.post("/", ControllerCity.createCity)
router.get("/", ControllerCity.findCities)
router.get("/:id", ControllerCity.findCity)
router.put("/:id", ControllerCity.updateCity)
router.delete("/:id", ControllerCity.deleteCity)

module.exports = router
