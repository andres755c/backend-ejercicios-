import { Router } from "express";
import { CarritoManager } from "../servicies/carritoManager.js";
import { ProductManager } from "../servicies/productManager.js"

//const carritoManager = new CarritoManager()

export const carritoRouter = Router()

carritoRouter.post('/', async (req, res) => {
    const { productoId } = req.body
    try {
        if(!ProductManager.getbyId(parseInt(productoId))) throw new Error(`El producto que posee el ID ${productoId} no esta`)
    } catch (err) {
        res.json({
            status: 'Error no fue posible crear el carrito',
            mansaje: err.mensaje
        })
    }
})

carritoRouter.get('/:cid', (req, res) => {
    try {
        const { cid } = req.params
        const seleccionarCarrito = c.carritoPorId(parseInt(cid))
        res.json({ status: 'Informacion del carrito', productos: seleccionarCarrito })
    } catch (err) {
        res.json({
            status: 'Error del carrito',
            mensaje: err.mensaje
        })
    }
})



carritoRouter.post('/cid/productos/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        if (!ProductManager.getbyId(parseInt(pid))) throw new Error(`El producto que tiene el ID ${pid} no esta`)
        const carrito = await CarritoManager.agregarProducto(cid, pid)
        res.json({ status: 'Se agrego el producto al carrito', mensaje: carrito})
    } catch (err) {
        res.json({
            status: 'Erro no se pudo agreagar el producto',
            mensaje: err.mensaje
        })
    }
})