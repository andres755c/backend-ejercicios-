import { Router } from 'express'
import { Carrito } from ''
import mongoose, { Schema } from 'mongoose'
import { Producto } from ''

export const CarritoRouter = Router()

CarritoRouter.get('/', async (req, res) => {
    const carritos = await Carrito.find().populate('carrito.productID')
    res.json(carritos)
})

CarritoRouter.get('/carritosActivos', async (req, res) => {

    const carritos = await Carrito.aggregate([
        { $match: { "status": true } },
        { $unwind: "$carrito" },
        {
            $lookup: {
                from: "products",
                localField: "carrito.productID",
                foreignField: "_id",
                as: 'datosProducto'
            }
        },
        { $unwind: "$datosProducto" },
        {
            $group: {
                _id: "$_id",
                total: { $sum: { $multiply: ["$carrito.cant", "$datosProducto.price"] } }
            }
        },
        {
            $project: {
                _id: 1,
                total: 1
            }
        }

    ])
    res.json(carritos)
})


CarritoRouter.get('/:cid', async (req, res) => {
    const carritoPorId = await Carrito.findById(req.params.cid).populate('carrito.productID')
    if (!carritoPorId) {
        return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' })
    }
    res.json(carritoPorId)
})

CarritoRouter.post('/', async (req, res) => {
    try {
        const newCarrito = await Carrito.create(req.body)
        res.status(201).json(newCarrito)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

CarritoRouter.put('/:cid/producto/:pid', async (req, res) => {
    const cant = req.body.cant
    const producto = await Carrito.findByIdAndUpdate(
        req.params.cid,
        { $set: { "carrito.$[elem].cant": cant }},
        { arrayFilters: [{ "elem._id": req.params.pid }]},
        { new: true }
    )
    res.status(201).json({ message: 'Producto Actualizado', info: producto})
})

CarritoRouter.put('/:cid/add/:pid', async (req, res) => {
    const carritoExist = await Carrito.findById(req.params.cid)
    if (!carritoExist) {
        res.json({message: "not found"})
        return
    }
    const productExist = await Carrito.find({
        _id: req.params.cid,
        carrito: { $elemMatch: { productID: req.params.pid } }
    })

    if (productExist.length > 0) {
        const updProduct = await Carrito.findByIdAndUpdate(
            req.params.cid,
            { $inc: { "carrito.$[elem].cant": 1 }},
            { arrayFilters: [{ "elem.productID": req.params.pid }]},
            { new: true }
        )
        res.status(201).json({ message: 'Producto Actualizado', info: updProduct })        
    } else {
        const addProduct = await Carrito.findByIdAndUpdate(
            req.params.cid,
            { $push: { carrito: { productID: req.params.pid, cant: 1 } } },
            { new: true }
        ).lean()
        res.status(201).json({ message: 'Producto Agregado', info: addProduct })        
    }
})

CarritoRouter.delete('/:cid', async (req, res) => {
    const delCarrito = await Carrito.findByIdAndDelete(
        req.params.cid,
        { new: true }
    )
    if (!delCarrito) {
        return res.status(401).json(`El carrito con ID ${req.params.cid} no existe`)
    }
    res.status(201).json({ message: 'Carrito Eliminado', info: delCarrito })
})

CarritoRouter.delete('/:cid/producto/:pid', async (req, res) => {
    const delProductoEnCarrito = await Carrito.findByIdAndUpdate(
        req.params.cid,
        { $pull: { carrito: { _id: req.params.pid } } },
        { new: true }
    )
    if (!delProductoEnCarrito) {
        return res.status(401).json(`El producto con ID ${req.params.pid} no existe en el carrito ${req.params.cid}`)
    }
    res.status(201).json({ message: 'Producto Eliminado del carrito', info: delProductoEnCarrito })
})