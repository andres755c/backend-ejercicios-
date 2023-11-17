import express from "express";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager("./products.json")
const app = express()

app.get('/productos', async (req, res) => {
    console.log(req.query)
    const {limit} = req.query
        res.json({productos: await productManager.obtenerTodos(Number(limit))})
    /*if (req.query['id']) {
        res.json({ productos : productManager.obtenerPorId(req.query('id'))
        })
    } else {
        res.json({productos: productManager.obtenerTodos()})
    }
    res.json({productos})*/
})

app.get('/productos/:pid', async (req, res) => {
    const idProductos = (req.params['pid'])
    const buscado = await productManager.obtenerPorId(Number(idProductos))
    if (buscado) {
        res.json({productos: buscado})
    } else {
        res.json({error: `no se pudo encontrar al producto con el id ${idProductos}`})
    }
})

app.listen(4545, () => {
    console.log('conectado correctamente')
})