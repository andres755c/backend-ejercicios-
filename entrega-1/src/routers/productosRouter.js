import { Router } from "express";
import { productManager } from "../servicies/productManager";

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

productRouter.get('/:pid', async (req, res) => {
    const idProductos = (req.params['pid'])
    const buscado = await ProductManager.obtenerPorId(Number(idProductos))
    if (buscado) {
        res.json({productos: buscado})
    } else {
        res.json({error: `No se encontro el producto con el id ${idProductos}`})
    }
})

productRouter.post('/', async (req, res) => {
    try {
        const { id, title, description, price, thumbnial, code, stock } = req.body
        if (!id || !title || !description || !code || !price || !stock || !thumbnial) throw new Error('Todos los datos del producto son obligatorios')
        const agregarProduct = await ProductManager.addProduct(req.body)
    res.json({
        mensaje: 'Producto agregado', 
        Producto: agregarProduct
    })
    } catch (err) {
        res.json({
            error: 'No se puedo agregar el producto', 
            mensaje: err.mensaje
        })
    }
    /*const agregarProduct = req.body
    const agregando = await ProductManager.addProduct(agregarProduct)
    if (agregando) {
        res.json({producto: agregando})
    } else {
        res.json({error: `no se agrego el producto`})
    }*/
})

productRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params
        const updateData = req.body
        const updProduct = await ProductManager.updateProduct(pid, updateData)
        res.json({
            status: 'Producto actualizado',
            producto: updProduct
        })
    } catch (err) {
        res.json({
            error: 'No se pudo actualizar'
        })
    } 
})
    /*const cambiarProduct = req.body
    const cambiar = await ProductManager.updateProduct(cambiarProduct)
    if (cambiar) {
        res.json({producto: cambiar})
    } else {
        res.json({error: `no se actualizo el producto`})
    }*/

productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        await ProductManager.deleteProduct(pid)
        res.json({
            status: 'Producto borrado',
            mensaje: `El producto con el ID ${pid} fue borrado`
        })
    } catch (err) {
        res.json({
            status: 'No se borro el producto por un error',
            mensaje: err.mensaje
        })
    }
})

productRouter.post('/', (req, res) => {
    const datosDelProducto = req.body
    const productoAgregado = ProductManager.add(datosDelProducto)
    res.json(productoAgregado)  
})