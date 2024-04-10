import { productService } from "../services/productServices.js"
import { dbProductos } from "../models/productModel.js"
import { faker } from "@faker-js/faker"
import { logger } from "../utils/logger.js"


export async function handleGet(req, res, next){
    try {
        if(req.params.id){
            console.log("ProductControllerID")
            const product = await productService.getProduct(req.params.id)
            res.json(product)
        }else{
            const product = await productService.getAllProduct()
            res.json(product)
        }
    } catch (error) {
        logger.warning("Error en handleGet Productos"),
        res.json(error)
    }
}

export async function handlePost(req, res, next) {
    try {
        res.json(await productService.createProduct(req.body))
    } catch (error) {
        logger.warning("Error en handlePost Productos"),
        res.json(error)
    }
}

export async function handlePut(req, res, next) {
    try {
        await productService.updateProduct(req.params.id, req.body)
        res.send("Producto actualizado")
    } catch (error) {
        logger.warning("Error en handlePut Productos"),
        res.json(error)
    }
}

export async function handleDelete(req, res, next) {
    try {
        await productService.deleteProduct(req.params.id)
        res.send("Ok eliminar")
    } catch (error) {
        logger.warning("Error en handleDelete Productos"),
        res.json(error)
    }
}

export async function handlePostMock (req, res) {
    const products = []
    for (let index = 0; index < 50; index++) {
        products.push({
            _id: faker.string.uuid(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            thumbnail: faker.image.urlPicsumPhotos(),
            code: faker.number.bigInt(),
            price: faker.commerce.price(),
            status: "true",
            stock: faker.number.int({ max: 20 }),
            category: faker.commerce.department()
        })
    }
    await dbProductos.insertMany(products)
    console.log("initialized")
    res.send("simulacro ok")
}