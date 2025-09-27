import { requireBody } from '../../api/middlewares/validate.js';
import { getAccount, createAccount, deleteAccount, updateAccountPassword } from '../../api/services/account.service.js';

import express from "express";
const router = express.Router();

router.get('/:id', async (req, res) => {
    try{
        const account = await getAccount(req.params.id);
        res.status(200).json(account);
    }
    catch(e){
        res.status(e.status || 404).json({ error: e.message || 'Account not found' });
    }
});

router.get('/:id/view', async (req, res) => {
    try{
        const account = await getAccount(req.params.id);
        res.type('html').send(`
            <h1>Account #${acc.id}</h1>
            <ul>
                <li>handle_name: ${acc.handle_name}</li>
                <li>display_name: ${acc.display_name}</li>
                <li>email: ${acc.email}</li>
                <li>created_at: ${new Date(acc.created_at).toISOString()}</li>
            </ul>
        `);
    } catch (e) {
        res.status(e.status || 404).send(`<p>${e.message || 'Account not found'}</p>`);
    }
});

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