const { promises: fs } = require('fs')

class ProductManager {
    static ultimoId = 0
    #products
    
    constructor({ruta}) {
        this.ruta = ruta
        this.#products = []
    }

    async reset() {
        try {
            await this.#readProducts()
        } catch (error) {
            await this.#readProducts()
        }
        if (this.#products.length === 0) {
            ProductManager.ultimoId = 0
        } else {
            ProductManager.ultimoId = this.#products.at(-1).id
        }
    }
    
    static generarUnId() {
        return ++ProductManager.ultimoId
    }

    async #readProducts() {
        const productsInJSON = await fs.readFile(this.ruta, 'utf-8')
        this.#products = JSON.parse(productsInJSON)
        this.#products = dataProductsArray.map(j => new Producto(j))
    }

    async #writeProducts() {
        await fs.writeFile(this.ruta, JSON.stringify(this.#products))
        await fs.writeFile(this.ruta, productsJSON)
    }

    async addProduct({title, description, price, thumbnial, code, stock}) {
        const id = ProductManager.generarUnId()
        const product = new Producto({
            title, id, description, price, thumbnial, code, stock
        })
        await this.#readProducts()
        this.#products.push(product)
        await this.#writeProducts()
        return product
    }
    
    async getProduct() {
        this.#readProducts()
        return this.#products
    }

    getProductById(id) {
        const idExistente = this.#products.find(p => p.id === parseInt(id))

        if(idExistente) {
            console.log(this.#products.filter(p => p.id === id))
            return this.#products.filter(p => p.id === id)
        } else {
            console.log(`OH NO, SE A REALIZADO UN ERROR :(((((((, id: ${id} no encontrado`)
        }
    }
}

class Producto {

    constructor({title, id = Producto.generarUnId(), description, price, thumbnial, code, stock}) {
        this.title = title
        this.id = id
        this.description = description
        this.price = price
        this.thumbnial = thumbnial
        this.code = code
        this.stock = stock
    }
}


async function main() {
    const pm = new ProductManager({ruta: 'productos.json'})
    await pm.reset()
    const p1 = await pm.addProduct({
        title:'Mouse', description:'un mouse simple', price:'$' + 200, thumbnial:'imagen.png', code:'',stock: 30 
    })
    const p2 = pm.addProduct({
        title:'Pad', description:'un Pad simple', price:'$' + 100, thumbnial:'imagen.png', code:'', stock: 20 
    })
    const p3 = pm.addProduct({
        title:'Teclado', description:'un Teclado simple', price:'$' + 300, thumbnial:'imagen.png', code:'', stock: 40 
    })
    const p4 = pm.addProduct({
        title:'Monitor', description:'un Monitor simple', price:'$' + 700, thumbnial:'imagen.png', code:'', stock: 10 
    })
    const p5 = pm.addProduct({
        title:'Auriculares', description:'unos Auriculares simple', price:'$' + 1000, thumbnial:'imagen.png', code:'', stock: 15 
    })
    
    console.log(await pm.getProduct())
    console.log(pm.getProductById())
}

main()