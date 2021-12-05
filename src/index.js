import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import userRouter from "../Routes/users";
import productRouter from '../Routes/products';
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan("dev"));
}

app.use(cors());

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Challenge MERN stack",
      version: "1.0.0",
    },

    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/products", productRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
