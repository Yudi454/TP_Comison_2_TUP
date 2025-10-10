import express from 'express';
import { deleteUnComedor, getAllComedores, getUnComedor, createNewComedor } from '../controllers/comedores.controller.js';

const router = express.Router();

router.get('/', getAllComedores);
router.get('/:id',getUnComedor)
router.delete('/:id',deleteUnComedor)
router.post('/',createNewComedor)

export default router;
