
class productManager {
    static #ultimoId = 0
    #productos
    
    constructor() {
        this.#productos = []
    }
    
    static generarUnId() {
        return ++productManager.#ultimoId
    }

    addProduct({title, description, price, thumbnial, stock}) {
        const id = productManager.generarUnId()
        const producto = new Producto({title, id, description, price, thumbnial, stock})
        this.#productos.push(producto)
        return producto
    }
    
    getProduct() { 
        return this.#productos
    }

    getProductById(id) {
        const idExistente = this.#productos.find(p => p.id === parseInt(id))

        if(idExistente) {
            console.log(this.#productos.filter(p => p.id === id))
            return this.#productos.filter(p => p.id === id)
        } else {
            console.log(`OH NO, SE A REALIZADO UN ERROR :(((((((, id: ${id} no encontrado`)
        }
    }
}

class Producto {

    constructor({title, id = Producto.generarUnId(), description, price, thumbnial, stock}) {
        this.title = title
        this.id = id
        this.description = description
        this.price = price
        this.thumbnial = thumbnial
        this.stock = stock
    }
}



const pm = new productManager()

const p1 = pm.addProduct({title:'Mouse', description:'un mouse simple', price:'$' + 200, thumbnial:'imagen.png', stock: 30 })
const p2 = pm.addProduct({title:'Pad', description:'un Pad simple', price:'$' + 100, thumbnial:'imagen.png', stock: 20 })
const p3 = pm.addProduct({title:'Teclado', description:'un Teclado simple', price:'$' + 300, thumbnial:'imagen.png', stock: 40 })
const p4 = pm.addProduct({title:'Monitor', description:'un Monitor simple', price:'$' + 700, thumbnial:'imagen.png', stock: 10 })
const p5 = pm.addProduct({title:'Auriculares', description:'unos Auriculares simple', price:'$' + 1000, thumbnial:'imagen.png', stock: 15 })

console.log(pm.getProduct())
console.log(pm.getProductById())