const Router = require("express")
const router = Router();
const {getSocios, getSocio, createSocio, updateSocio, darBajaSocio, reactivarSocio} = require("../controllers/socios.controlleres");


router.get("/socios",getSocios);
router.get("/socios/:id", getSocio);
router.post("/socios/crear", createSocio);
router.put("/socios/actualizar/:id",updateSocio);
router.put("/socios/darBaja/:id",darBajaSocio);
router.put("/socios/reactivar/:id",reactivarSocio);

module.exports= router