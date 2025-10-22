import { requireBody, validateAccountHandle, validateAccountHandleFormat, validateAccountDisplayName } from '../../api/middlewares/validate.js';
import { getAccount, createAccount, deleteAccount, updateAccountPassword, updateAccountHandle, updateAccountDisplayName } from '../../api/services/account.service.js';

import express from "express";
const router = express.Router();

/**
 * GET /accounts/:handle
 */
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
        return res.status(e.status || 404).json({ error: e.message || 'User not found' });
    }
});

/**
 * Optional HTML view by handle
 * GET /accounts/:handle/view
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
        res.status(e.status || 404).send(`<p>${e.message || 'User not found'}</p>`);
    }
});

/**
 * POST /accounts
 * body: { email, password, displayName? }
 */
router.post('/', requireBody(['email', 'password', 'handlename', 'displayname']), async (req, res) => 
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
        const result = await deleteAccount(handle)
        console.log(">>> DELETE /users/:handle called with param:", handle);

        res.status(200).json(
        {
            message: `User '@${result.handle_name}' deleted successfully.`
        });
    }
    catch (e)
    {
        res.status(e.status || 500).json({ error: e.message });
    }
});

/**
 * PATCH /accounts/:handle/password
 * body: { currentPassword, newPassword }
 */
router.patch('/:handle/password', requireBody(['currentPassword', 'newPassword']), async (req, res) => 
{
    try
    {
        const handle = validateAccountHandle(req);
        await updateAccountPassword(handle, req.body.currentPassword, req.body.newPassword);
        
        res.status(200).json(
        {
            message: `Password updated successfully for account '@${handle}'.`
        });
    }
    catch (e)
    {
        res.status(e.status || 500).json({ error: e.message, details: e.details });
    }
});

/**
 * PATCH /accounts/:handle/renamehandle
 * body: { newHandle: "new_handlename" }
 */
router.patch("/:handle/rename/handle", requireBody(["newHandle"]), async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        const newHandle = validateAccountHandleFormat(req.body.newHandle);
        const updated = await updateAccountHandle(handle, newHandle);
        res.status(200).json(
        {
            message: `Handle updated successfully to '@${handle}'.`,
            updatedHandle: updated.handle_name
        });
    }
    catch(e)
    {
        res.status(e.status || 500).json({ error: e.message });
    }
});

/**
 * PATCH /accounts/:handle/rename/displayname
 * body: { newName: "new_name" }
 */
router.patch("/:handle/rename/displayname", requireBody(["newName"]), async (req, res) =>
{
    try
    {
        const handle = validateAccountHandle(req);
        const newName = validateAccountDisplayName(req.body.newName);
        const updated = await updateAccountDisplayName(handle, newName);
        res.status(200).json(
        {
            message: `Display name updated successfully for @${handle}.`,
            updatedDisplayName: updated.display_name
        });
    }
    catch(e)
    {
        res.status(e.status || 500).json({ error: e.message });
    }
});


export default router;