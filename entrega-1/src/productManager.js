import { Producto } from "./productos.js"

export class productManager{
    constructor() {
        this.productos = [{
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
    getAll() {
        return this.productos
    }
    add(datosDelProducto) {
        const nuevo = new Producto(datosDelProducto)
        this.productos.push(nuevo)
        return nuevo
    }
}

