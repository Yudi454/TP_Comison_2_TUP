import { Router } from 'express'
import { migrateTables, populateTables } from '../controllers/migration.controller.js'


const route = Router()


route.get('/migrate', migrateTables)
route.get('/populate', populateTables)



export default route