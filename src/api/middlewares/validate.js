import { getAccount } from "../services/account.service.js"

/**
 * Build a middleware to ensure required fields exist in req.body
 * @param {string[]} fields
 */
export function requireBody(fields)
{
    return (req, res, next) => 
    {
        const missing = fields.filter(f => !(f in req.body));
        if (missing.length)
        {
            return res.status(400).json({ error: `Missing: ${missing.join(', ')}` });
        }

        next();
    };
}

export function validateAccountHandle(req)
{
    const source = req.params.handle ?? req.body.handle ?? "";
    return validateAccountHandleFormat(source);
}

export function validateAccountHandleFormat(source)
{
    const trimmed = String(source ?? "").trim();
    
    if (!/^[A-Za-z0-9_-]{1,50}$/.test(trimmed))
    {
        throw new Error("Invalid handle format");
    }

    return trimmed;
}

// used only when id is require to link on other db table
export async function toAccountId(handle)
{
    const account = await getAccount(handle);

    if (!account)
    {
        throw new Error("Account not found");
    }

    return account.id;
}

