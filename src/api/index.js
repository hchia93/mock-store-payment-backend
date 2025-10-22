import accountRouter from "./routers/account.js";
import productRouter from "./routers/product.js";
import cartRouter from "./routers/cart.js";

import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
const app = express();

// Project intro endpoint
app.get("/", (req, res) =>
{
    res.send(`
        <h2>Mock Store Payment Backend</h2>
        <p>This is a test backend API built with <b>Node.js</b>, <b>Express</b>, and <b>Prisma</b>.</p>
        <p>It simulates a small store environment for learning API design and backend engineering.</p>
        <ul>
            <li><b>/accounts</b> – Manage user accounts and credentials.</li>
            <li><b>/products</b> – Access product listings and pricing.</li>
            <li><b>/purchase</b> – (WIP) Handle mock transactions and cart flows.</li>
        </ul>
        <p>GitHub: <a href="https://github.com/hchia93/mock-store-payment-backend" target="_blank">hchia93/mock-store-payment-backend</a></p>
    `);
});

app.use(express.json());
app.use('/account', accountRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);

app.listen(process.env.PORT || 3000, () => 
{
    console.log('API listening');
});