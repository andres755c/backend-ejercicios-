import express from "express";
import { initialize } from "./utils/mocks.js";
import { faker } from "@faker-js/faker";
import swaggerUiExpress from "swagger-ui-express";
import { apiRouter } from './routers/api/apiRouter.js';
import { webRouter } from './routers/webRouters.js';
import { Server as IOserver} from 'socket.io';
import { engine } from "express-handlebars";
import { MONGODB_CNX_STR } from "./config.js";
import CustomError from "./services/errors/customErrors.js";
import EError from "./services/errors/enums.js";
import { addLogger } from "./utils/logger.js";
import { logger } from "./utils/logger.js";
import { specs } from "./utils/swagger.js";

const app = express() 

await mongoose.connect(MONGODB_CNX_STRING)
if(!mongoose.connect(MONGODB_CNX_STRING)){
    CustomError.createError({
        name: "DataBase Error",
        cause: "Unable to connect to Mongo",
        message: "Check your Mongoose configuration",
        code: EError.DATABASE_ERROR
    })
}
logger.info("Connected to Mongo")

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs) )
app.use(addLogger)
app.use(sesiones)
app.use(autenticacion)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api", apiRouter)
app.listen(PORT, () => {
    logger.info("listening on port 8080")
})

initialize()