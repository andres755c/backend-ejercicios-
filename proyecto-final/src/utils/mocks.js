import { UserManager } from "../models/userModel.js"
import { dbProductos } from "../models/productModel.js"
import { dbCart } from "../models/cartModel.js"
import { hashear } from "./criptografia.js"
import { faker } from "@faker-js/faker"
import passport from "passport"
import { logger } from "./logger.js"

export const users = [
    { name: "Juan Carlos", lastname: "Fernandez", email: "JC@mail.com", age: 25, password: "123", rol: "admin"},
    { name: "Angela", lastname: "Rojas", email: "AR@mail.com", age: 22, password: "123", rol: "admin"},
    { name: "Pepe", lastname: "Martinez", email: "PM@mail.com", age: 37, password: "123", rol: "admin"},
    { name: "Leandro", lastname: "Suarez", email: "LS@mail.com", age: 21, password: "123", rol: "user"},
    { name: "Sergio", lastname: "Peinado", email: "SP@mail.com", age: 25, password: "123", rol: "user"},
    { name: "David", lastname: "Canovas", email: "DC@mail.com", age: 18, password: "123", rol: "user"},
    { name: "Agustin", lastname: "Mercedes", email: "AM@mail.com", age: 29, password: "123", rol: "user"},
    { name: "Ricardo", lastname: "Arjona", email: "RA@mail.com", age: 45, password: "123", rol: "user"},
    { name: "Daniel", lastname: "Peña", email: "DP@mail.com", age: 30, password: "123", rol: "user"},
    { name: "Manuel", lastname: "Benitez", email: "MB@mail.com", age: 19, password: "123", rol: "user"},
    { name: "Antonela", lastname: "Galarza", email: "AG@mail.com", age: 60, password: "123", rol: "user"},
    { name: "Marcela", lastname: "Cadavid", email: "MC@mail.com", age: 58, password: "123", rol: "user"},
    { name: "Julieta", lastname: "Gomez", email: "JG@mail.com", age: 74, password: "123", rol: "user"},
    { name: "Oriana", lastname: "Garai", email: "JG@mail.com", age: 36, password: "123", rol: "user"},
    { name: "Pedro", lastname: "Gonzales", email: "PG@mail.com", age: 17, password: "123", rol: "user"},
]

const products = [
    {_id: "1", title: "Mouse Logitech", description: "Mouse de la marca Logitech", price: 40000, thumbnail: "img1", code: "1", stock: 20, status: "true",category: "Especia"},
    {_id: "2", title: "Mouse Pad XL", description: "Mouse Pad XL de Red Dragon", price: 30000, thumbnail: "img2", code: "2", stock: 40, status: "true",category: "Liquido"},
    {_id: "3", title: "Teclado Red Dragon", description: "Teclado Mecanico de Red Dragon", price: 40000, thumbnail: "img3", code: "3", stock: 50, status: "true",category: "Especia"},
]

const carts = [{_id: "123", product: [{pid: "a3", quantity:5}, {pid: "a1", quantity:2}]},
]

export async function initialize(){
    await UserManager.deleteMany({})
    for (const p of users) {
        p.password = hashear(p.password)
    }
    await UserManager.insertMany(users)

    logger.debug("Registro del Usuarios se ah actualizado")

    await dbProductos.deleteMany({})
    await dbProductos.insertMany(products)
    logger.debug("Registro de Productos actualizado")

    await dbCart.deleteMany({})
    await dbCart.insertMany(carts),
    logger.debug("Registro de Carts actualizado")
}