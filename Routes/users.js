import express from "express";
import datauser from '../user'
import bodyParser from "body-parser";

const userRouter = express.Router();
userRouter.use(bodyParser.json()); 

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - ci
 *         - password
 *         - isAdmin 
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         name:
 *           type: string
 *           description: id of author
 *         email:
 *           type: string
 *           description: title of user
 *         ci:
 *           type: number
 *           descripton: content of user *
 *         password:
 *           type: number
 *           descripton: content of user *
 *         isAdmin:
 *           type: boolean
 *           descripton: content of user *
 *       example:
 *         id: 1
 *         name: Nombre
 *         email: Email
 *         ci: Cédula de identidad
 *         password: Password
 *         isAdmin: Admin
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Users
 *    description: users of users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorno todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: listado de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

userRouter.get("/", (req, res) => {
  res.send(datauser);
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retorno ususario por id
 *     tags: [Users]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de usuario
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: usuarios por id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: usuario no encontrado
 */

userRouter.get("/:id", (req, res) => {
  const user = datauser.find((user) => user.id === +req.params.id);

  if (!user) {
    res.sendStatus(404);
  }

  res.send(user);
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creo un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: El usuario fue creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el servidor
 */

userRouter.post("/", (req, res) => {
  try {
    const user = {
      ...req.body,
      id: datauser.length + 1,
    };

    datauser.push(user);

    res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizo usurio por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: EL usuario se actualizo correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Sucedio algun error.
 *
 */

userRouter.put("/:id", (req, res) => {
  try {
    let user = datauser.find((user) => user.id === +req.params.id);
    user.userId = req.body.userId;
    user.title = req.body.title;
    user.body = req.body.body;

    res.send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: Eliminar usuario
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: El usuario fue borrado
 *        404:
 *          description: Usuario no encontrado
 *
 */

 userRouter.delete("/:id", (req, res) => {
  let user = datauser.find((user) => user.id === +req.params.id);
  const index = datauser.indexOf(user);

  if (user) {
    datauser.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = userRouter;
