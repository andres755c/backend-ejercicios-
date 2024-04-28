import { cartService } from "../services/cartServices.js"

export async function handleGet(req, res, next) {
    try{
        if(req.params.id){
            const carts = await cartService.getCart(req.params.id)
            res.json(carts)
        }else{
            const carts = await cartService.getAllCarts()
            res.json(carts)
        }
    } catch (error) {
        res.json(error)
    }
}

export async function handleDelete (req, res, next) {
    try{
        if(req.params.pid) {
            await cartService.deleteProductInCart(req.params.pid)
            res.send("Eliminar producto del carrito")
        }else{
            await cartService.deleteCart(req.params.id)
            res.send("Eliminar carrito exitosamente")
        }
    } catch (error) {
        res.json(error)
    }
}