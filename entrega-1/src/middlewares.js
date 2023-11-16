import express from "express";
import { productManager } from "./productManager.js";

const app = express()
const ProductManager = new productManager()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log('mid 1')
    req['carga'] = 'cositas'
    next()
    //next(error)
})

app.use((req, res, next) => {
    console.log('mid 2')
    if (parseInt(String(req.query.limit)) < 0) {
        return next(new Error('los limites no pueden ser negativos, solamente positivos'))
    }
    next()
    //next(error)
})

app.use((req, res, next) => {
    console.log('mid 3')
    next()
    //next(error)
})

app.get('/cosas', (req, res) => {
    console.log('controller')
    console.log(req['cositas'])
    const limit = parseInt(String(req.query.limit))
    const cosas = ProductManager.getAll()
    res.json(cosas.slice(0, limit))
    /*const resultado = []
    for (let i = 0; i < limit; i++) {
        resultado.push(cosas[i])
    }
    res.json(resultado)*/    
})

app.use((err, req, res, next) => {
    res.json({
        status: 'error',
        description: err.message
    })
})

app.listen(4545, () => {
    console.log('conectado correctamente')
})