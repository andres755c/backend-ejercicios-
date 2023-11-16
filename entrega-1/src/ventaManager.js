import { Venta } from "./venta.js"

export class VentaManager{
    constructor() {
        this.ventas = [{
            monto1: 5000,
            monto2: 10000,
            monto3: 3000,
            monto4: 45000,
            monto5: 195000,
        }]
    }
    getAll() {
        return this.ventas
    }
    add(datosDeLaVenta) {
        const nuevo = new Venta(datosDelProducto)
        this.ventas.push(nuevo)
        return nuevo
    }
}