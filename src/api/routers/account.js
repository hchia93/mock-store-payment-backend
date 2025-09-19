import prisma from "../../api/prisma.js"

import express from "express";
const router = express.Router();

router.post('/', async(req, res) => 
{
    const { username, password, email } = req.body;
    try {
        const account = await prisma.account.create({
            data: { 
                username,
                password_hash: password, // bcrypt later.
                email,
            },
        });

        res.status(201).json(account);
    }
    catch (e)
    {
        res.status(400).json({error : e.message });
    }
});

router.get('/', async(req, res)=> {
    const accounts = await prisma.account.findMany();
    res.json(accounts);
});

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id, 10);
    const accounts = await prisma.account.findUnique({ where: {id} });
    if (!accounts) return res.status(404).json({ error: 'User account not found'});
    res.json(accounts);
});

export default router;