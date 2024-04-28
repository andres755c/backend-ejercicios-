import { Router } from 'express'
import { Carrito } from ''
import { Producto } from ''

export const InitRouter = Router()

const dataSet = []

InitRouter.get('/', async (req, res) => {
    await Carrito.deletMany()
    await Producto.deletMany()
    await Producto.insertMany(dataSet)
    res.send('Base de datos creada')
})