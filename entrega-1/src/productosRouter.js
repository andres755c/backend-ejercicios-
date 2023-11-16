import { Router } from "express";
import { productManager } from "./productManager.js";

const ProductManager = new productManager()

export const productRouter = Router()

productRouter.get('/', (req, res) => {
    const limit = parseInt(String(req.query.limit))
    const cosas = ProductManager.getAll()
    res.json(cosas.slice(0, limit))
    /*const resultado = []
    for (let i = 0; i < limit; i++) {
        resultado.push(cosas[i])
    }
    res.json(resultado)*/    
})

productRouter.post('/', (req, res) => {
    const datosDelProducto = req.body
    const productoAgregado = ProductManager.add(datosDelProducto)
    res.json(productoAgregado)  
})