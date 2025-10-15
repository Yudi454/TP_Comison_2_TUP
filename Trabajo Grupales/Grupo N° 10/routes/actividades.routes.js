const express = require("express")
const {getActividades, CreateAtividades, updateActividades, deleteActividades} = require("../controllers/actividades.controler")

const router = express.router()

router.get("/", getActividades)
router.post("/", CreateAtividades)
router.put("/:id", updateActividades)
reoter.delete("/:id", deleteActividades)

module.exports = Router