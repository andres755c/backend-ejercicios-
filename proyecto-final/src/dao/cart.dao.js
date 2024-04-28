import { dbCart } from "../models/cartModel.js"
import CustomError from "../services/errors/customErrors.js"
import EError from "../services/errors/enums.js"
import { logger } from "../utils/logger.js"

class cartDao{
    async create(data){
        const cart = await dbCart.create(data)
        return cart    
    }

    async readOne(id){
        const cart = await dbCart.findById(id).populate("product.pid").lean()
        if(!cart)   CustomError.createError({
            name: "Cart not found",
            cause: "Invalidad Id",
            message: logger.error("Carrito no encontrado"),
            code: EError.INVALID_VALUE
        })
        return cart
    }

    async readMany(){
        const carts = await dbCart.find().populate("product.pid").lean()
        return carts
    }

    async updateOne(id, pid){
        const cart = await dbCart.findById(id).lean()
        if(!cart) throw new Error ("Carrito no encontrado")
        const productInCart =  cart.product.find(product => product.pid === pid)
        if(!productInCart){
            await dbCart.findByIdAndUpdate(id,
                {$push: {product: {pid: pid, quantity: 1}}},
                {new: true}).lean()
        } else {
            const updatedCart = await dbCart.findOneAndUpdate( 
            { _id: id, 'product.pid': pid },
            { $inc: { 'product.$.quantity': 1 } },
            { new: true }).lean()
            return updatedCart
        }
    }

    async deleteProd(id, pid){
        const cart = await dbCart.findById(id)
        if(!cart) throw new Error ("Carrito no encontrado")
        const  productInCart = cart.product.find(product => product.pid === pid)
        if(!productInCart) throw new Error ("Producto no encontrado")
        const updatedCart = await dbCart.findByIdAndUpdate(id,
            { $pull: { product: { pid: pid }}},
            { new: true }).lean()   
            return updatedCart            
    }

    async deleteOne(id){
        await dbCart.findByIdAndDelete(id)
    }
}

export const cartDaoModel = new cartDao()