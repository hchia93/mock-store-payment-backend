import prisma from "../../api/prisma.js"
import { hashPassword, verifyPassword } from "../utils/password.js"
import { validatePassword } from "../validators/passwordRules.js"

export async function getAccount(handle)
{
    if (typeof handle !== 'string' || handle.length === 0 || handle.length > 50)
    {
        const err = new Error('service: invalid handle');
        err.status = 400;
        throw err;
    }

    const account = await prisma.account.findUnique(
    {
        where: { handle_name : handle },
        select: 
        {
            id:true,
            id: true,
            handle_name: true,
            display_name: true,
            email: true,
            created_at: true
        }
    });

    if (!account)
    {
        const err = new Error('service: account not found');
        err.status = 404;
        throw err;
    }

    return account;
}

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

    console.log({ email, handle_name, display_name, passwordHash });

    try
    {
        const acc = await prisma.account.create(
        {
            data: { email, handle_name, display_name, password_hash:passwordHash },
            select: { id:true, email:true, handle_name:true, display_name:true, created_at:true },
        });
        return acc;
    }
    catch (e)
    {   
        console.error(">>> Prisma error raw:", e);
        console.error(">>> name:", e.name);
        console.error(">>> code:", e.code);
        console.error(">>> meta:", e.meta);
        console.error(">>> message:", e.message);
        console.error(">>> stack:", e.stack);

        if (e?.code === "P2002") 
        {
            const t = Array.isArray(e?.meta?.target) ? e.meta.target.join(",") : "";
            const msg = t.includes("handle_name")
                ? "handle_name already exists"
                : "email already exists";
            const err = new Error(msg);
            err.status = 409;
            throw err;
        }
    }
}

/**
 * Hard delete an account by id.
 * @param {string|number} id
 */
export async function deleteAccount(handle)
{
    try
    {
        const result = await prisma.account.delete({
            where: { handle_name: handle.trim() }
        });
        console.log(">>> Prisma delete result:", result);
        return result;
    }
    catch (e)
    {
        console.error(">>> Prisma delete failed:", e);
        throw e;
    }
}
/**
 * Update password, verifying current password first
 * @param {string|number} id
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export async function updateAccountPassword(handle, currentPassword, newPassword)
{
    const acccount = await prisma.account.findUnique(
        {   
            where: { handle_name : handle },
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
        where: { handle_name: handle },
        data: { password_hash: newHash },
    });
}

/**
 * Update account handle name if new handle is unique.
 * @param {string} currentHandle
 * @param {string} newHandle
 */
export async function updateAccountHandle(currentHandle, newHandle)
{
    const account = await prisma.account.findUnique(
    {
        where: { handle_name : currentHandle },
        select: { id : true },
    });

    if (!acccount)
    {
        const err = new Error("account not found");
        err.status = 404;
        throw err;
    }

    const existing = await prisma.account.findUnique(
    {
        where: { handle_name: newHandle },
        select: { id : true },
    });
    
    if (existing)
    {
        const err = new Error("handle_name already exists");
        err.status = 409;
        throw err;
    }

    const updated = await prisma.account.update(
    {
        where : {id: account_id },
        data: { handle_name : newHandle },
        select: { id: true, handle_name: true, display_name: true, email: true, created_at: true },
    });

    return updated;
}