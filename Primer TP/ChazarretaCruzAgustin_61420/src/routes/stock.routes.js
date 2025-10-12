import { Router } from "express";
import { getStock, createStock, updateStock, deleteStock } from "../controllers/stock.controller.js";

const router = Router();

router.get("/", getStock);
router.post("/", createStock);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

export default router;
