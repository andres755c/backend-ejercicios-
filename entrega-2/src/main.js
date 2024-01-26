import express from "express";
import { apiRouter } from ''
import { webRouter } from './routers/webRouters.js'
import { Server as IOserver} from 'socket.io'
import { engine } from "express-handlebars";
import { MONGODB_CNX_STR } from "./config.js";

const app = express() 
app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')
app.use('/static', express.static('./static'))

app.use('/', webRouter)
console.log(`La base de datos esta conectada en ${MONGODB_CNX_STR}`)
app.use("/api", apiRouter)
app.use("/", webRouter)

const server = app.listen(4545, () => { console.log('conectado al puerto') })

const ioServer = new IOserver(server)

ioServer.on('connection', socket => {
    console.log('una nueva conexion: ', socket.id)
})