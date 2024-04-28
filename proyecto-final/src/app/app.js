import express from "express";
import swaggerUiExpress from "swagger-ui-express";
import { PORT } from "../config.js";
import { initialize } from "./utils/mocks.js";
import { apiRouter } from './routers/api/apiRouter.js';
import { addLogger } from "./utils/logger.js";
import { specs } from "./utils/swagger.js";
//import { faker } from "@faker-js/faker";
//import { webRouter } from './routers/webRouters.js';
//import { Server as IOserver} from 'socket.io';
//import { engine } from "express-handlebars";
//import CustomError from "./services/errors/customErrors.js";
//import EError from "./services/errors/enums.js";


const app = express

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs) )
app.use(addLogger)
app.use(logging)
app.use(sesiones)
app.use(autenticacion)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", apiRouter)
app.listen(PORT, () => {
    logger.info("listening on port 8080")
})
app.use('/api-docs/', docsRouter)

initialize()

let server

export function levantarServidor(puerto = 0) {
    return new Promise((resolve, reject) => {
        server = app.listen(puerto, () => {
        resolve(true)
        })
    })
}

export function cerrarServidor() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                reject(true)
            } else {
                resolve(true)
            }
        })
        })
    }