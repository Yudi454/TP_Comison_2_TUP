const express = require("express");
const ctrl = require("../controllers/libros.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/", verifyToken, ctrl.getAll);
router.get("/:id", verifyToken, ctrl.getById);
router.post("/", verifyToken, ctrl.create);
router.put("/:id", verifyToken, ctrl.update);
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
