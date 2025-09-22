import { requireBody } from '../../api/middlewares/validate.js';
import { createAccount, deleteAccount, updateAccountPassword } from '../../api/services/account.service.js';

import express from "express";
const router = express.Router();

/**
 * POST /accounts
 * body: { email, password, displayName? }
 */
router.post('/', requireBody(['email', 'password, handle_name']), async (req, res) => 
{
    try
    {
        const acc = await createAccount(req.body);
        res.status(201).json(acc);
    }
    catch (e)
    {
        res.status(e.status || 500).json({ error: e.message, details: e.details });

    }
});

router.delete('/:id', async (req, res) =>
{
    try
    {
        await deleteAccount(req.params.id);
        res.status(204).end();
    }
    catch (e)
    {
        res.status(e.status || 500).json({error: e.message});
    }
});

/**
 * PATCH /accounts/:id/password
 * body: { currentPassword, newPassword }
 */
router.patch('/:id/password', requireBody(['currentPassword', 'newPassword']), async (req, res) => 
{
    try
    {
        await updateAccountPassword(req.params.id, req.body.currentPassword, req.body.newPassword);
        res.status(204).end();
    }
    catch (e)
    {
        res.status(e.status || 500).json({ error: e.message, details: e.details });
    }
});

export default router;