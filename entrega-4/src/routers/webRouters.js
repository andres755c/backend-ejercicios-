import { Router } from "express";

export const webRouter = Router() 

webRouter.get('/', (req, res) => {
    res.render('inicio', {titulo: 'Pre-Entrega numero dos'})
})

webRouter.get('/productos', (req, res) => {
    res.render('productos')
})

webRouter.get('/carrito', (req, res) => {
    res.render('carrito')
})