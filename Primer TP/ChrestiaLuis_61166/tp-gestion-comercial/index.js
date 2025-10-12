import express from 'express'
import routeMigration from './routes/migration.route.js'
import routeVendedores from './routes/vendedores.route.js'
import routeProveedores from './routes/proveedores.route.js'
import routeProductos from './routes/productos.route.js'
import routeVentas from './routes/ventas.route.js'
import routeMetricas from './routes/metricas.route.js'

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use('/api', routeMigration)
app.use('/api/vendedores', routeVendedores)
app.use('/api/proveedores', routeProveedores)
app.use('/api/productos', routeProductos)
app.use('/api/ventas', routeVentas)
app.use('/api/metricas', routeMetricas)




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})