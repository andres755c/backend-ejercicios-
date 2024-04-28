import { dbProductos } from "../models/productModel.js"
import CustomError from "../services/errors/customErrors.js"
import EError from "../services/errors/enums.js"
import { logger } from "../utils/logger.js"

export class productDao {
    async create(data){
        const product = await dbProductos.create(data)
        return product
    }

    async readOne(id){
        const product = await dbProductos.findById(id)
        if(!product) {
            CustomError.createError({
                name: "Producto no encontrado",
                cause: "ID no valido",
                message: logger.error("Datos ingresados inválidos"),
                code: EError.INVALID_VALUE
            })
        }
        return product
    }

    async readMany(){
        const product = await dbProductos.find().lean()
        return product
    }

    async updateOne(id, data){
        const updatedProduct = await dbProductos.findByIdAndUpdate(id,
            {$set: data},
            {new: true}).lean()
            return updatedProduct
    }

    async deleteOne(id){
    await dbProductos.findByIdAndDelete(id)
    }
}

export const productDAOModel = new productDao()