import http from 'http'

const productos = [
    { producto: 'Motorola EDGE 30 Fusion',
        description: 'celular de alta gama',
        categoria: 'celular de Alta Gama',
        id: '1',
        price: 345000,
        thumbnial: 'https://tiendadiggit.com.ar/web/image/product.image/2321/image_1024/Celular%20Motorola%20Edge%2030%20Fusion%2012Gb%20256Gb?unique=f807148',
        code: 'Ui7bbjhUIV3yui2J',
        stock: '30',
    },
    { producto: 'Cargador del Motorola EDGE 30 fusion',
        description: 'velocidad de 68.2W max',
        categoria: 'cargador de celular de 68.2W max',
        id: '2',
        price: 100000,
        thumbnial: 'https://http2.mlstatic.com/D_NQ_NP_654982-MLA70588786801_072023-O.webp',
        code: 'GfvHBjknI7TFVub5',
        stock: '10', }
]

const cursos = [
    {curso: 'informatica', tiempo: '6 meses', categoria: 'epico'},
    {curso: 'refrigeracion', tiempo: '10 meses', categoria: 'estandar'}
]

const server = http.createServer((request, response) => {
    const { url, method } = request
    console.log(url, method)
    const path = url?.split('?')[0]

    if (method === 'GET') {
        if (path === '/productos')
        response.end(JSON.stringify({ productos }))
    }/*else if (path === '/cursos') {
        const query = url?.split('?')[1]
        const atributo = query?.split('=')[0]
        const valor = query?.split('=')[1]
        response.end(JSON.stringify({
        cursos:
            cursos.filter(cursos => cursos[atributo] === valor)
        }))
    }*/
    /*if (method === 'GET') {
        if (path === '/cursos')
        response.end(JSON.stringify({ cursos }))
    }*/ 
})

server.listen(4545, () => {
    console.log('conectado correctamente')
})