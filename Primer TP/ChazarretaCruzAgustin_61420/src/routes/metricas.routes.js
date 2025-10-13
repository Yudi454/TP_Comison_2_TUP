import { Router } from "express";
import { getMetricas } from "../controllers/metricas.controller.js";

const router = Router();

router.get("/", getMetricas);

export default router;