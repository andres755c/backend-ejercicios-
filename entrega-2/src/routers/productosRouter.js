import { Router } from 'express'
import { Producto } from ''

export const ProductosRouter = Router()

ProductosRouter.get('/', async (req, res) => {
    let opciones = {}
    const filtro = (!req.query.filtro) ?  '' : { category: req.query.filtro }
    const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 3, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones }
    const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones }
    const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones }
    const paginado = await Producto.paginate(filtro, opciones)
    const resoults = {
        status: 'success',
        payload: paginado.docs,
        totalPages: paginado.totalPages,
        prevPage: paginado.prevPage,
        nextPage: paginado.nextPage,
        page: paginado.page,
        hasPrevPage: paginado.hasPrevPage,
        hasNextPage: paginado.hasNextPage,
        prevLink: '',
        nextLink: ''
    }

    res.json(resoults)
    const productos = await Producto.find()
    res.json(productos)
})

ProductosRouter.get('/cat/', async (req, res) => {
    const categoriasProductos = await Producto.aggregate([
        { $group: {_id: "$category"}}
    ])
    res.json (categoriasProductos)
})

ProductosRouter.get('/:pid', async (req, res) => {
    const productoPorId = await Producto.findById(req.params.pid)
    if (!productoPorId) {
        return res.status(404).json({ message: 'El producto que esta buscando no existe en esta base de datos' })
    }
    res.json(productoPorId)
})

ProductosRouter.post('/', async (req, res) => {
    try {
        const nuevoProducto = await Producto.create(req.body)
        res.status(201).json(nuevoProducto)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

ProductosRouter.put('/:pid', async (req, res) => {
    if (req.body.code) {
        return res.status(400).json(`No se puede modificar el código del producto`)
    }

    const updProducto = await Producto.findByIdAndUpdate(
        req.params.pid,
        { $set: req.body },
        { new: true }
    )
    if (!updProducto) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }
    res.json(updProducto)
})

ProductosRouter.delete('/:pid', async (req, res) => {
    const delProducto = await Producto.findByIdAndDelete(
        req.params.pid
    )
    if (!delProducto) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }
    res.json(delProducto)
})