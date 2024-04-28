import { ticketRepository } from "../repository/ticketRepository.js";
import { cartService } from "./cartServices.js";

class TicketService{
    async createTicket(){
        const cart = await cartService.getCart(idCart)
        if(!cart) throw new Error("cart not found")
            const totalDelCarrito = cart.product.reduce((total, producto) => {
            const precioDelProducto = producto.pid.price;
            const cantidad = producto.quantity;

            return total + precioDelProducto * cantidad;
            }, 0);

            return { _id: idCart, total: totalDelCarrito, data: resultados};
        ;
        const ticket = await ticketRepository.createTicket(data)
        return ticket;
        }
    }

    export const ticketService = new TicketService();