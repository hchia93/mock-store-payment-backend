import prisma from "../../api/prisma.js"
import { hashPassword, verifyPassword } from "../utils/password.js"
import { validatePassword } from "../validators/accountRules.js"

/**
 * @typedef {Object} CreateAccountInput
 * @property {string} email
 * @property {string} password
 * @property {string} handle_name
 * @property {string} [display_name]
 */

/**
 * Create a new account.
 * @param {CreateAccountInput} input
 */
export async function createAccount(input)
{
    const { email, password, handle_name, display_name } = input;
    if (!email) throw new Error('email required');
    if (!handle_name) throw new Error('handle_name required');

    const policy = validatePassword(password);
    if (!policy.ok)
    {
        const err = new Error('password invalid');
        err.details = policy.errors;
        err.status = 400;
        throw err;
    }

    const passwordHash = await hashPassword(password);

    try
    {
        const acc = await prisma.account.create(
        {
            data: { email, handle_name, display_name, password_hash },
            select: { id:true, email:true, handle_name:true, display_name:true, created_at:true },
        });
        return acc;
    }
    catch (e)
    {   
        if (e?.code === 'P2002') 
        {
            const t = Array.isArray(e?.meta?.target) ? e.meta.target.join(',') : '';
            const msg = t.includes('handle_name') ? 'handle_name already exists' : 'email already exists';
            const err = new Error(msg); err.status = 409; throw err;
        }
        throw e;
    }
}

/**
 * Hard delete an account by id.
 * @param {string|number} id
 */
export async function deleteAccount(id)
{
    await prisma.account.delete({ where: { id: typeof id === 'string' ? Number(id) : id } });
}

/**
 * Update password, verifying current password first
 * @param {string|number} id
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export async function updateAccountPassword(id, currentPassword, newPassword)
{
    const acccount = await prisma.account.findUnique(
        {   
            where: { id: typeof id === 'string' ? Number(id) : id },
            select: { id: true, password_hash: true },
        });
    
    if (!account)
    {
        const err = new Error('account not found'); 
        err.Status = 404;
        throw err;
    }

    const ok = await verifyPassword(currentPassword, account.password_hash);
    if (!ok)
    {
        const err = new Error('current password incorrect');
        err.status = 403;
        throw err;
    }

    const policy = validatePassword(newPassword);
    if (!policy.ok) 
    { 
        const err = new Error('password invalid'); 
        err.details = policy.errors; 
        err.status = 400; 
        throw err; 
    }

    const newHash = await hashPassword(newPassword);
    await prisma.account.update(
    {
        where: { id: account.id },
        data: { password_hash: newHash },
    });
}