import prisma from "../../api/prisma.js"

import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

export default router;