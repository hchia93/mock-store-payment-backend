import { requireBody } from '../../api/middlewares/validate.js';
import { getAccount, getAccountByHandle, createAccount, deleteAccount, updateAccountPassword } from '../../api/services/account.service.js';

import express from "express";
const router = express.Router();


router.get('/:handle', async(req, res) => 
{
    try
    {
        const handle = String(req.params.handle ?? '').trim();
        if (!/^[A-Za-z0-9_-]{1,50}$/.test(handle))
        {
            return res.status(400).json({ error: 'invalid handle' });
        }

        const account = await getAccountByHandle(handle);
        return res.status(200).json(account);
    }
    catch (e)
    {
        return res.status(e.status || 404).json({ error: e.message || 'Account not found' });
    }
});

/**
 * Optional HTML view by handle
 * GET /accounts/@:handle/view
 */
router.get('/:handle/view', async (req, res) =>
{
    try
    {
        const handle = String(req.params.handle ?? '').trim();
        if (!/^[A-Za-z0-9_-]{1,50}$/.test(handle))
        {
            return res.status(400).send('<p>invalid handle</p>');
        }

        const account = await getAccountByHandle(handle);

        const html =
        `<h1>Account #${account.id}</h1>
        <ul>
            <li>handle_name: ${account.handle_name}</li>
            <li>display_name: ${account.display_name}</li>
            <li>email: ${account.email}</li>
            <li>created_at: ${new Date(account.created_at).toISOString()}</li>
        </ul>`;

        res.type('html').send(html);
    }
    catch (e)
    {
        res.status(e.status || 404).send(`<p>${e.message || 'Account not found'}</p>`);
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const idStr = String(req.params.id ?? '').trim();
        if (!/^[1-9]\d*$/.test(idStr))
        {
        res.status(400).json({ error: 'invalid id param' });
        return;
        }

        const id = Number(idStr);
        const account = await getAccount(id);
        res.status(200).json(account);
    }
    catch (e)
    {
        res.status(e.status || 404).json({ error: e.message || 'Account not found' });
    }
});

router.get('/:id/view', async (req, res) =>
{
  try
  {
        const idStr = String(req.params.id ?? '').trim();
        if (!/^[1-9]\d*$/.test(idStr))
        {
        res.status(400).send('<p>invalid id param</p>');
        return;
        }

        const id = Number(idStr);
        const account = await getAccount(id);

        const html =
        `<h1>Account #${account.id}</h1>
        <ul>
            <li>handle_name: ${account.handle_name}</li>
            <li>display_name: ${account.display_name}</li>
            <li>email: ${account.email}</li>
            <li>created_at: ${new Date(account.created_at).toISOString()}</li>
        </ul>`;

        res.type('html').send(html);
    }
    catch (e)
    {
        res.status(e.status || 404).send(`<p>${e.message || 'Account not found'}</p>`);
    }
});

/**
 * POST /accounts
 * body: { email, password, displayName? }
 */
router.post('/', requireBody(['email', 'password', 'handle_name']), async (req, res) => 
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
    console.log(">>> DELETE /users/:id called with param:", req.params.id);

    try
    {
        await deleteAccount(req.params.id);
        console.log(">>> DELETE success:", req.params.id);

        res.status(204).end();
    }
    catch (e)
    {
        console.error(">>> DELETE error for id:", req.params.id, e);
        res.status(e.status || 500).json({ error: e.message });
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