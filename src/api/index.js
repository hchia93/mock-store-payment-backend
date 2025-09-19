import userRouter from "./routers/account.js";
import productRouter from "./routers/product.js"

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/accounts', userRouter);
app.use('/products', productRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to mock store!",
    dbUser: process.env.DB_USER,
    dbName: process.env.DB_NAME,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});