const express = require('express');
const router = express.Router();
const artistasController = require('../controllers/artistas.controllers');


router.get('/', artistasController.getAllArtistas);
router.get('/:id', artistasController.getArtistasById);  
router.post('/', artistasController.createArtista);      
router.put('/:id', artistasController.updateArtista);    
router.delete('/:id', artistasController.deleteArtista); 

module.exports = router;