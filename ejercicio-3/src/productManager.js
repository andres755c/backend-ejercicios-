import fs from 'fs/promises'

export class ProductManager {
    constructor(path) {
        this.path = path
        this.productos = [
        { producto: 'Motorola EDGE 30 Fusion',
            description: 'celular de alta gama',
            categoria: 'celular de Alta Gama',
            id: '1' ,
            price: 345000,
            thumbnial: 'https://tiendadiggit.com.ar/web/image/product.image/2321/image_1024/Celular%20Motorola%20Edge%2030%20Fusion%2012Gb%20256Gb?unique=f807148',
            code: 'Ui7bbjhUIV3yui2J',
            stock: '30',
        },
        { producto: 'Cargador del Motorola EDGE 30 fusion',
            description: 'velocidad de 68.2W max',
            categoria: 'cargador de celular de 68.2W max',
            id: '2' ,
            price: 100000,
            thumbnial: 'https://http2.mlstatic.com/D_NQ_NP_654982-MLA70588786801_072023-O.webp',
            code: 'GfvHBjknI7TFVub5',
            stock: '10', }
        ]
    }

    async #read() {
        this.productos = JSON.parse(await fs.readFile(this.path, 'utf-8'))
    }

    obtenerTodos() {
        if(limit) this.productos.slice(0, limit)
        return this.productos
    }

    async obtenerPorId(id) {``
        //await this.#read()
        return this.productos.find(p => p.id === id)
    }
}