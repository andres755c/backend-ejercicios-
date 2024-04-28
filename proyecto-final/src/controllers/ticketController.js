import { TicketManager } from "../models/ticketModel.js";
import { emailService } from "../services/emailServices.js";
import { ticketService } from "../services/ticketServices.js";
import {randomUUID,  randomInt } from "crypto"
import { logger } from "../utils/logger.js";
import { smsService } from "../services/smsServicesTwilio.js";
import { ADMIN_PHONE_NUMBER } from "../config.js";

export async function handlePost(req, res, next) {
    try {
        const userInfo = req.user.cart
        const purchaser = req.user.email

        async function calcularElTotalDelCarrito(carro) {
            let total = 0;

            carro.product.forEach((item) => {
                total += item.pid.price * item.quantity;
            });

            return total;
        }
        const totalCarrito = await calcularElTotalDelCarrito(userInfo);

        const ticket = {
            _id: randomUUID(),
            code: randomInt(10, 1000),
            purchaseDateTimel: new Date(),
            amount: totalCarrito,
            purchaser: purchaser
        }

        await TicketManager.create(ticket)

        const destinatario = "pepeusuario@gmail.com"
        const asunto = "Compra realizada"
        const mensaje = ticket
        res.json(ticket)
    } catch (error) {
        logger.error("Error en al realizar su compra")
        res.send(error)
    }
}