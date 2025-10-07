import { requireBody, validateAccountHandle } from '../../api/middlewares/validate.js';
import { getAccount, createAccount, deleteAccount, updateAccountPassword, updateAccountHandle } from '../../api/services/account.service.js';

import express from "express";
const router = express.Router();


router.get('/:handle', async(req, res) => 
{
    try
    {
        const handle = validateAccountHandle(req);
        const account = await getAccount(handle);
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
        const handle = validateAccountHandle(req);
        const account = await getAccount(handle);

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

router.delete('/:handle', async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        await deleteAccount(handle)
        console.log(">>> DELETE /users/:handle called with param:", handle);
        res.status(204).end();
    }
    catch (e)
    {
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
        const handle = validateAccountHandle(req);
        await updateAccountPassword(handle, req.body.currentPassword, req.body.newPassword);
        res.status(204).end();
    }
    catch (e)
    {
        res.status(e.status || 500).json({ error: e.message, details: e.details });
    }
});

/**
 * PATCH /accounts/:handle/rename
 * body: { newHandle: "new_name" }
 */
router.patch("/:handle/rename", requireBody(["newHandle"]), async (req, res) =>
{
    try
    {
        const currentHandle = validateAccountHandle(req);
        const newHandle = validateAccountHandleFormat(newHandle);
        const updated = await updateAccountHandle(currentHandle, newHandle);
        res.status(200).json(updated);
    }
    catch(e)
    {
        res.status(e.status || 500).json({ error: e.message });
    }
});

export default router;