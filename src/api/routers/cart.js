import { addToCart, getCart, removeFromCart, clearCart } from "../services/cart.service.js";
import { requireBody, validateAccountHandle } from '../../api/middlewares/validate.js';

import express from "express";
const router = express.Router();

/**
 * GET /cart/:handle
 * Get cart items for a specific account
 */
router.get("/:handle", async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        const cart = await getCart(handle);
        res.status(200).json(cart);
    }
    catch (e)
    {
        res.status(e.status || 400).json({ error: e.message });
    }
});

/**
 * POST /cart/:handle/add
 * Add items to cart for a specific account
 * body: { items: Array<{productId: number, quantity: number}> }
 */
router.post("/:handle/add", requireBody(["items"]), async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        const items = Array.isArray(req.body.items) ? req.body.items : [];

        if (items.length === 0)
        {
            return res.status(400).json({ error: "No items provided" });
        }

        const result = await addToCart(handle, items);
        res.status(200).json(result);
    }
    catch (e)
    {
        res.status(e.status || 400).json({ error: e.message });
    }
});

/**
 * DELETE /cart/:handle/remove
 * Remove a specific product from cart
 * body: { productId: number }
 */
router.delete("/:handle/remove", requireBody(["productId"]), async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        const productId = Number(req.body.productId);
        const result = await removeFromCart(handle, productId);
        res.status(200).json(result);
    }
    catch (e)
    {
        res.status(e.status || 400).json({ error: e.message });
    }
});

/**
 * DELETE /cart/:handle/clear
 * Clear all items from cart for a specific account
 */
router.delete("/:handle/clear", async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        await clearCart(handle);
        res.status(204).end();
    }
    catch (e)
    {
        res.status(e.status || 400).json({ error: e.message });
    }
});

export default router;