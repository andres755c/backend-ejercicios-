import { logger } from "./utils/logger.js";
import { PORT } from "./config.js";
import { levantarServidor } from "./app/app.js";
import { connectDb } from "./db/mongodb.js";

await connectDb()
logger.info("Conectado a la base de datos")

levantarServidor(PORT)
logger.info(`Servidor levantado al puerto ${PORT}`)