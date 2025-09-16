import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "../generated/prisma/index.js";

dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({
    message: "Mock Store API running.",
    dbUser: process.env.DB_USER,
    dbName: process.env.DB_NAME,
  });
});

app.get("/products", async (req, res) => {
  const products = await prisma.products.findMany();
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

