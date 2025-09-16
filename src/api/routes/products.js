import express from "express";
const router = express.Router();

// GET / products
router.get("/", (req, res) => {
    res.json([
        { id : 1, name: "Turnip", category: "Vegetable" },
        { id : 2, name: "Blueberry", category: "Fruit" }
    ]);
});

export default router;