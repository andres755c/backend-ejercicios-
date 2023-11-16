import express from "express";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager()
const app = express()

app.get('/productos', (req, res) => {
    console.log(req.query)
    if (req.query['id']) {
        res.json({ productos : productManager.obtenerPorId(req.query('id'))
        })
    } else {
        res.json({productos: productManager.obtenerTodos()})
    }
    res.json({productos})
})

app.get('/productos/:pid', async (req, res) => {
    const idProductos = parseInt(req.params['pid'])
    const buscado = await productManager.obtenerPorId(idProductos)
    if (buscado) {
        res.json({productos: buscado})
    } else {
        res.json({error: `no se pudo encontrar al producto con el id ${idProductos}`})
    }
})

app.listen(4545, () => {
    console.log('conectado correctamente')
})