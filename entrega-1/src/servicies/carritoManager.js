import fs from 'fs/promises'
//import { Carrito } from "../models/carrito.js"

export class CarritoManager{
    constructor() {
        this.carrito = []
    }

    async init() {
        try {
            const contenido = await this.#readfile()
            contenido.forEach(el => {
                this.carrito.push(el)
            });
            CarritoManager.id = this.carrito[this.carrito.length - 1].id
            console.log('Los datos del carrito no fueron leidos de manera correcta')
        } catch (err) {
            console.log('No se guardo el carrito')
        }
    }

    async crearCarrito(pid) {
        const nuevoCarrito = new CarritoProducts()
        nuevoCarrito.addProduct(pid)
        this.carrito.push(nuevoCarrito)
        return nuevoCarrito
    }

    async addProduct(cid, pid) {
        const carritoIndex = this.carrito.findIndex(el => el.id === parseInt(cid))
        if (carritoIndex === -1) throw new Error(`Carrito con ID ${cid} no esta`)
        const productoIndex = this.carrito[carritoIndex].products.findIndex(el => el.productoId === parseInt(pid))
    if(productoIndex === -1) {
        this.carrito[carritoIndex]
.products.push({productoId: parseInt(pid), quantity: 1})
        } else {
            this.carrito[carritoIndex].products[productoIndex].quantity ++
        }
        await this.#writefile(this.carrito)
        return this.carrito[carritoIndex]
    }

    getCarritoPorId (cid) {
        const seleccionarCarrito = this.carrito.find(el => el.id === cid)
        if (!seleccionarCarrito) throw new Error (`Carrito con ID ${cid} no esta`)
        return seleccionarCarrito
    }

    async #readfile() {
        const contenidoDelArchivo = await fs.readFile(carrito_path, 'utf-8')
        return JSON.parse(contenidoDelArchivo)
    }

    async #writefile(cart) {
        await fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8')
    }

    /*getAll() {
        return this.carrito
    }
    add(datosDelCarrito) {
        const nuevo = new Carrito(datosDelCarrito)
        this.carrito.push(nuevo)
        return nuevo
    }*/
}