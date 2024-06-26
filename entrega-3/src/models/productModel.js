import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const schemaProducto = new Schema ({
    _id: { type: String, default: randomUUID},
    title: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    price: { type: Number, require: true },
    status: { type: Boolean, default: true },
    stock: { type: Number, require: true },
    category: { type: String, require: true },
    image: { type: String, default: '' }
}, {
    strict: 'throw',
    versionKey: false,
    static: {},
    methods: {},
})

schemaProducto.plugin(mongoosePaginate)

export const Producto = model('products', schemaProducto)