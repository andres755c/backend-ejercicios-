import { Router, json } from "express";
import { ProductosRouter } from "./productosRouter";
import { InitRouter } from "./initRouters";
import { CarritoRouter } from "./carritoRouters";

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/productos', ProductosRouter)
apiRouter.use('/carritos', CarritoRouter)
apiRouter.use('/dbInit', InitRouter)