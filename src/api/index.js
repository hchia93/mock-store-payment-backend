import userRouter from "./routers/account.js";
import productRouter from "./routers/product.js"

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
const app = express();

app.use(express.json());
app.use('/accounts', userRouter);
app.use('/products', productRouter);

app.listen(process.env.PORT || 3000, () => 
{
    console.log('API listening');
});