require("dotenv").config();
const express = require("express");
const conection = require("./config/db");

const routerUsuarios = require("./routes/rutasUsuarios");
const routerProductos = require("./routes/rutasProductos");
const routerProveedor  =require("./routes/rutasProveedor")
const routerStock  = require("./routes/rutasStock")
const routerVentas = require("./routes/rutasVentas")

const app = express();

app.use(express.json());

app.use("/usuarios", routerUsuarios);
app.use("/productos",routerProductos)
app.use("/proveedor",routerProveedor)
app.use("/stock",routerStock)
app.use("/ventas",routerVentas)

const PORT = process.env.PORT || 8000;

conection.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos");
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("Conectado al puerto" + PORT);
});
