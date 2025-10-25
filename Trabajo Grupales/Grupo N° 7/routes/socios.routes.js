const Router = require("express")
const router = Router();
const {getSocios, getSocio, createSocio, updateSocio, darBajaSocio, reactivarSocio, loginSocio, recuperarPassword } = require("../controllers/socios.controlleres");


router.get("/",getSocios);
router.get("/:id", getSocio);
router.post("/crear", createSocio);
router.put("/actualizar/:id",updateSocio);
router.put("/darBaja/:id",darBajaSocio);
router.put("/reactivar/:id",reactivarSocio);
router.post('/login', loginSocio);
router.post('/recuperar', recuperarPassword);

module.exports= router