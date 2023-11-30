import { Router } from "express";
import { CarritoRouter } from "./carritoRouter.js";
import { productRouter } from "./productosRouter.js";

export const apiRouter = Router()

app.use('/productos', productRouter)
app.use('/ventas', CarritoRouter)