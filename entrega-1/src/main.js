import express from "express";
import { ventasRouter } from "./ventasRouter.js";
import { productRouter } from "./productosRouter.js";
import { upload } from "multer.js";

const app = express()

app.use(express.json())

app.use(express.static('./views'))
app.use('/static', express.static('./static'))

app.use('/api/ventas', ventasRouter)
app.use('/api/productos', productRouter)

app.post('/uploads', upload.single('imagen'), (req, res) => {
    res.json({
        file: req.file
    })
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