import express from "express";
import { apiRouter } from "./apiRouters.js";
import { webRouter } from "./webRouter.js";

const app = express()

app.use(express.json())

/*app.use(express.static('./views'))
app.use('/static', express.static('./static'))*/

//app.use('/api', apiRouter)
//app.use('/', webRouter)
app.use('/', productosRouter)
app.use('/', carritoRouter)

/*app.use((err, req, res, next) => {
    res.json({
        status: 'error',
        description: err.message
    })
})*/

app.listen(4545, () => {
    console.log('conectado correctamente')
})