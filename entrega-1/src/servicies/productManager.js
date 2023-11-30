import fs from 'fs/promises'
//import { Producto } from "../models/productos.js"

    class ProductManager {
        #products
        
        constructor({path}) {
            this.path = path
            this.#products = []
        }
        
        async reset() {
            this.#products = []
            await this.#writeProducts()
        }
        
        #generarId() {
            if (this.#products.length > 0) {
            return this.#products[this.#products.length - 1].id + 1
            } else {
            return 1
            }
        }
        
        async #readProducts() {
            const productsInJson = await fs.readFile(this.path, 'utf-8')
            const dataProductArray = JSON.parse(productsInJson)
            this.#products = dataProductArray.map(j => new Product(j))
        }
        
        async #writeProducts() {
            const productsJson = JSON.stringify(this.#products, null, 2)
            await fs.writeFile(this.path, productsJson)
        }
        
        async updateProduct(id, productData) {
            await this.#readProducts()
            const index = this.#products.findIndex(u => u.id === id)
            if (index !== -1) {
                const newProductu = new Product({ id, ...this.#products[index], ...productData })
                this.#products[index] = newProductu
                await this.#writeProducts()
                return newProductu
            } else {
                throw new Error('error al intentar actualizar el producto: producto no encontrado')
            }
        }
        
        async deleteProduct(id) {
                await this.#readProducts()
                const index = this.#products.findIndex(u => u.id === id)
                if (index !== -1) {
                const arrayConLosBorrados = this.#products.splice(index, 1)
                await this.#writeProducts()
                return arrayConLosBorrados[0]
            } else {
                throw new Error('error al intentar borrar un producto: producto no encontrado')
            }
        }
        
        async addProduct({ title, description, price, thumbnial, code, stock }) {
            await this.#readProducts()
            const id = this.#generarId()
            const product = new Product({ id, title, description, price, thumbnial, code, stock })
            this.#products.push(product)
            await this.#writeProducts()
            return product
        }
        
        async getProduct() {
                await this.#readProducts()
                return this.#products
            }

            async obtenerPorId(id) {``
            await this.#readProducts()
            return this.productos.find(p => p.id === id)
        }
        }
        
        class Product {
        constructor({ id, title, description, price, thumbnial, code, stock }) {
                this.id = id
                this.title = title
                this.description = description
                this.price = price
                this.thumbnial = thumbnial
                this.code = code
                this.stock = stock
            }
        }
        
        async function main() {
            const pm = new ProductManager({ path: 'products.json' })
            pm.reset()
        
            console.log('ingresado: ', await pm.addProduct({
            title: 'Motorola EDGE 30 Fusion',
            description: 'celular de alta gama',
            price: 345000,
            thumbnial: 'https://tiendadiggit.com.ar/web/image/product.image/2321/image_1024/Celular%20Motorola%20Edge%2030%20Fusion%2012Gb%20256Gb?unique=f807148',
            code: 'Ui7bbjhUIV3yui2J',
            stock: '30',
        }))
        
            console.log('ingresado: ', await pm.addProduct({
            title: 'Cargador del Motorola EDGE 30 fusion',
            description: 'velocidad de 68.2W max',
            price: 100000,
            thumbnial: 'https://http2.mlstatic.com/D_NQ_NP_654982-MLA70588786801_072023-O.webp',
            code: 'GfvHBjknI7TFVub5',
            stock: '10',
        }))
        
            console.log('conseguidos: ', await pm.getProduct())
        
            console.log('actualizado: ', await pm.updateProduct(1, { price: 400000, stock: 10, code: 'LJGyu67VYv7712Be' }))
            console.log('eliminado: ', await pm.deleteProduct(2))
        
            console.log('conseguidos: ', await pm.getProduct())
        
            const otropm = new ProductManager({ path: 'products.json' })
        
            console.log('ingreso otro: ', await otropm.addProduct({
            title: 'Funda transparente de silicona ',
            description: 'funda del modelo EDGE 30 fusion del material silicona',
            price: 5000,
            thumbnial: 'https://http2.mlstatic.com/D_NQ_NP_921102-MLA71651774146_092023-O.webp',
            code: 'Yuf67buiBU9rlvZ0',
            stock: '50',
        }))
        
        console.log('conseguidos: ', await pm.getProduct())
        }
        
        main()

/*export class productManager{
    constructor(path) {
        this.path = path 
        this.producto = []
        /*this.productos = [{
            producto1: {
                nombre: 'Motorola EDGE 30 Fusion',
                description: 'celular de alta gama',
                price: 345000,
                thumbnial: 'https://tiendadiggit.com.ar/web/image/product.image/2321/image_1024/Celular%20Motorola%20Edge%2030%20Fusion%2012Gb%20256Gb?unique=f807148',
                code: 'Ui7bbjhUIV3yui2J',
                stock: '30',
            },
            producto2: {
                nombre: 'Cargador del Motorola EDGE 30 fusion',
                description: 'velocidad de 68.2W max',
                categoria: 'cargador de celular de 68.2W max',
                price: 100000,
                thumbnial: 'https://http2.mlstatic.com/D_NQ_NP_654982-MLA70588786801_072023-O.webp',
                code: 'GfvHBjknI7TFVub5',
                stock: '10',
            },
            producto3: {
                nombre: "Funda transparente de silicona ",
                description: "funda del modelo EDGE 30 fusion del material silicona",
                price: 5000,
                thumbnial: "https://http2.mlstatic.com/D_NQ_NP_921102-MLA71651774146_092023-O.webp",
                code: "Yuf67buiBU9rlvZ0",
                stock: '50'
            }
        }]
    }

    async reset() {
        this.productos = []
        await this.#writeProducts()
    }
    
    async #readProducts() {
        this.productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    }

    async #writeProducts() {
        const producsJson = JSON.stringify(this.productos, null, 2)
        await fs.writeFile(this.path, producsJson)
    }

    getAll() {
        return this.productos
    }

    add(datosDelProducto) {
        const nuevo = new Producto(datosDelProducto)
        this.productos.push(nuevo)
        return nuevo
    }

    async obtenerPorId(id) {``
        await this.productos()
        return this.productos.find(p => p.id === id)
    }
}*/

