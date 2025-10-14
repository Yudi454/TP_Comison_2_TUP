const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')

const clientesRoutes = require('./routes/clientes.js')


dotenv.config()
const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())


app.use('/clientes', clientesRoutes)


const PORT = 8000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))