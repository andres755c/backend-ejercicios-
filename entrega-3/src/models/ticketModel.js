import { Schema, model } from "mongoose";
import {randomInt, randomUUID} from "crypto"

const coleccion = "ticket"

export const TicketSchema = new Schema({
    _id: {type: String},
    code: {type: Number},
    purchaseDateTime: {type: String},
    amount: {type: Number},
    purchaser: {type: String}
},{
    strict: "throw",
    versionKey: false,
    statics:{},
    methods: {}
})

export const TicketManager = model(coleccion, TicketSchema)