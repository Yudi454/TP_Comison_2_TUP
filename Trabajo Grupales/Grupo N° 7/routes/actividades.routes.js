const Router = require("express")
const router = Router();
const {getActividades, CreateAtividades, updateActividades, deleteActividades} = require("../controllers/actividades.controler")



router.get("/", getActividades)
router.post("/crear", CreateAtividades)
router.put("/:id", updateActividades)
router.delete("/:id", deleteActividades)

module.exports = router