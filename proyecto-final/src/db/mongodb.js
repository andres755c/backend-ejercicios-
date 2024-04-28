import mongoose from "mongoose"
import { MONGODB_CTX_STR } from '../config.js'

export async function connectDb() {
    await mongoose.connect(MONGODB_CTX_STR)
    console.log(`conectado a la base de datos`)
}

export function disconnectDb() {
    return mongoose.disconnect()
}