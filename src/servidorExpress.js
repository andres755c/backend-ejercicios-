import express  from 'express'
import { ProductManager } from './ProductManager'

const productManager = new ProductManager('./products.json')
const port = 7575
const app = express()

app.get('/productos', async (req, res) => {
    const limit = parseInt(req.query.limit)
    const productos = await productManager.obtenerTodos()
    return res.status(200).json(productos)
})

app.get('/productos/:pid', async (req, res) => {
    const idProductos = parseInt(req.params.pid)
    const productos = await productManager.obtenerPorId(idProductos)
        if (!productos) {
            return res.status(404).json({error: 'No se encontro el producto'})
        }
    return res.status(200).json(productos)
})

app.listen(port, ()=>{console.log(`servidor escuchando al puerto ${port}`)})

/*app.listen(7575, () => {
    console.log('conectado al puerto')
})*/