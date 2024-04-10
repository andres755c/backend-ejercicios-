import { cartDAOModel } from "../dao/cart.dao.js";

class CartRepository{
    async getAllCarts(){
        return await cartDAOModel.readMany()
    }

    async getCart(id){
        return await cartDAOModel.readOne(id)
    }

    async createCart(data){
        return await cartDAOModel.create(data)
    }

    async updateCart(id, pid){
        return await cartDAOModel.updateOne(id, pid)
    }

    async deleteCart(id){
        return await cartDAOModel.deleteOne(id)
    }

    async deleteProductInCart(id, pid){
        return await cartDAOModel.deleteProd(id, pid)
    }
}

export const cartRepository = new CartRepository()