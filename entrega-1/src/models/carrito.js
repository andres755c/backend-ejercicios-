export class Carrito {
    constructor() {
        this.id = ++CartManager.id
        this.productos = []
    }
    addProduct({ prodId }) {
        this.productos.push({
            prodId,
            quantity: 1
        })
    }
}