const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')

const usuariosRoutes = require('./routes/usuarios.routes.js')
const proveedoresRoutes = require('./routes/proveedores.routes.js')
const productosRoutes = require('./routes/productos.routes.js')
const ventasRoutes = require('./routes/ventas.routes.js')
const metricasRoutes = require('./routes/metricas.routes.js')

dotenv.config()
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())


app.use('/', usuariosRoutes)
app.use('/', proveedoresRoutes)
app.use('/', productosRoutes)
app.use('/', ventasRoutes)
app.use('/', metricasRoutes)

const PORT = 8000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
