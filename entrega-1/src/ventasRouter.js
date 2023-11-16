import { Router } from "express";
import { VentaManager } from "./ventaManager.js";

const ventasManager = new VentaManager()

export const ventasRouter = Router()

ventasRouter.get('/', (req, res) => {
    const limit = parseInt(String(req.query.limit))
    const cosas = ventasManager.getAll()
    res.json(cosas.slice(0, limit))
    /*const resultado = []
    for (let i = 0; i < limit; i++) {
        resultado.push(cosas[i])
    }
    res.json(resultado)*/    
})

ventasRouter.post('/', (req, res) => {
    const datosDeLaVenta = req.body
    const ventaAgregada = VentaManager.add(datosDeLaVenta)
    res.json(ventaAgregada)  
})