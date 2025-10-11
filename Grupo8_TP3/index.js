require("dotenv").config();

const express = require("express");
const conection = require("./config/database");

const app = express();

app.use(express.json());

conection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

const PORT = process.env.PORT

app.listen(PORT, (err) => {
    if(err) throw err
    console.log("Conectado al puerto " + PORT);
    
})
