const {Router} = require('express');
const router = Router(); // crea una instancia de Router de Express
const clientesRouter = require('./clientes.routes'); // importa el enrutador de clientes
const productosRouter = require('./productos.routes'); // importa el enrutador de productos
const ventasRouter = require('./ventas.routes'); // importa el enrutador de ventas
const usuariosRouter = require('./usuarios.routes'); // importa el enrutador de usuarios
const loginRouter = require('./login.routes'); // importa el enrutador de login
const detallesVentaRouter = require('./detalle.ventas.routes'); // importa el enrutador de detalles de venta
const mailRouter = require('./mail.routes'); // importa el enrutador de mail
const authRouter = require('./auth.routes'); // importa el enrutador de autenticación

router.use("/auth", authRouter); // monta el enrutador de autenticación en la ruta /auth

router.use("/mail", mailRouter); // monta el enrutador de mail en la ruta /mail

router.use("/clientes", clientesRouter); // monta el enrutador de clientes en la ruta /clientes
router.use("/productos", productosRouter); // monta el enrutador de productos en la ruta /productos
router.use("/ventas", ventasRouter); // monta el enrutador de ventas en la ruta /ventas
router.use("/usuarios", usuariosRouter); // monta el enrutador de usuarios en la ruta /usuarios
router.use("/login", loginRouter); // monta el enrutador de login en la ruta /login
router.use("/detalles-venta", detallesVentaRouter); // monta el enrutador de detalles de venta en la ruta /detalles-venta

module.exports = router; // exporta el enrutador principal