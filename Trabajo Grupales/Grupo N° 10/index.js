require("dotenv").config()
const express = require('express');
const { conection } = require('./config/database');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(express.json());


// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a Ozono');
});