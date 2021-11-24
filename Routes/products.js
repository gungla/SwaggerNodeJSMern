import express from "express";
import dataprod from "../products";
import bodyParser from "body-parser";

const productRouter = express.Router();
productRouter.use(bodyParser.json()); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - image
 *         - description
 *         - brand
 *         - category
 *         - price
 *         - countInStock
 *         - rating
 *         - numReviews
 *       properties:
 *         id:
 *           type: integer
 *           description: ID generada de un producto
 *         name:
 *           type: string
 *           description: nombre del porducto
 *         image:
 *           type: string
 *           descripton: imagen del producto
 *         brand:
 *           type: string
 *           descripton: marca del producto
 *         category:
 *           type: string
 *           descripton: categoria del producto
 *         price:
 *           type: number
 *           descripton: precio del producto
 *         countInStock:
 *           type: number
 *           descripton: stock del producto
 *         rating:
 *           type: number
 *           descripton: rating del producto
 *         numReviews:
 *           type: number
 *           descripton: reviews del producto
 *       example:
 *         id: 1
 *         name: nombre del producto
 *         image: imagen del producto
 *         description: descricpión del producto
 *         brand: marca del producto
 *         category: categoria del producto
 *         price: precio del producto
 *         countInStock: sotck del producto
 *         rating: rating del producto
 *         numReviews: reviews del producto
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Products
 *    description: products of users
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorno todos los productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Listado de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

 productRouter.get("/", (req, res) => {
  res.send(dataprod);
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Traigo producto por id
 *     tags: [Products]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id del producto
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: productos por su id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: no se puede encontrar el producto
 */

productRouter.get("/:id", (req, res) => {
const product = dataprod.find((product) => product.id === +req.params.id);

  if (!product) {
    res.sendStatus(404);
  }

  res.send(product);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Creo un nuevo producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: El producto fue creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Algún error del servidor
 */

 productRouter.post("/", (req, res) => {
  try {
    const product = {
      ...req.body,
      id: dataprod.length + 1,
    };

    dataprod.push(product);

    res.send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: actualiza productos por id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         decsription: El producto fue actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: no se encontró el producto.
 *       500:
 *         description: Sucedio un error.
 *
 */

 productRouter.put("/:id", (req, res) => {
  try {
    let product = dataprod.find((product) => product.id === +req.params.id);
    product.userId = req.body.userId;
    product.title = req.body.title;
    product.body = req.body.body;

    res.send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 *  /products/{id}:
 *    delete:
 *      summary: Elimino un producto por id
 *      tags: [Products]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: producto id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: El producto fue eliminado
 *        404:
 *          description: No se encontró el producto
 *
 */

 productRouter.delete("/:id", (req, res) => {
  let product = dataprod.find((product) => product.id === +req.params.id);
  const index = dataprod.indexOf(product);

  if (product) {
    dataprod.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = productRouter;
