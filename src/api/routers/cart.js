import prisma from "../../api/prisma.js";
import { addToCart } from "../services/cart.service.js";
import { getAccountIdByHandle } from "../../api/middlewares/validate.js";

import express from "express";
const router = express.Router();

router.post("/add", async (req, res) => 
{
    try {
        const handle = validateAccountHandle(req);
        const items = Array.isArray(req.body.items) ? req.body.items : [];

        if (items.length == 0)
        {
            return res.status(400).json({ error: "No items provided"});
        }

        const result = await addToCart(handle, items);
        res.status(200).json(result);
    }

    catch(e) {
        res.status(400).json({ error: e.message });
    }
});

export default router;