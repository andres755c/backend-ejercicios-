import http from 'http'

const productos = []

const servidor = http.createServer((request, response) => {
    const {url, metodo} = request
    console.log(metodo, url)
    const ruta = url?.split('?')[0]

    if (metodo === 'GET') {
        if (ruta === '/celulares-y-dispositivos') {
            response.end(JSON.stringify({productos: [] }))
        } else if (ruta === '/quimica') {
            const query = url.split('?')[1]
            const atributo = query.split('=')[0]
            const valor = query.split('=')[1]
            response.end(JSON.stringify({productos: productos.filter(p = p[atributo] === valor) }))
        } else if (ruta === '/') {
            response.end('<h1>Venta de productos random</h1>')
        }
    }
})