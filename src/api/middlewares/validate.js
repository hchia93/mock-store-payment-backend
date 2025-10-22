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

/**
 * Validate account handle from request parameters or body
 * @param {Object} req - Express request object
 * @returns {string} Validated handle
 */
export function validateAccountHandle(req)
{
    const source = req.params.handle ?? req.body.handle ?? "";
    return validateAccountHandleFormat(source);
}

/**
 * Validate account handle format (alphanumeric, underscore, hyphen, 1-50 chars)
 * @param {string} source - Handle string to validate
 * @returns {string} Validated handle
 * @throws {Error} If handle format is invalid
 */
export function validateAccountHandleFormat(source)
{
    const trimmed = String(source ?? "").trim();
    
    if (!/^[A-Za-z0-9_-]{1,50}$/.test(trimmed))
    {
        throw new Error("Invalid handle format");
    }

    return trimmed;
}

/**
 * Validate account display name format and length
 * @param {string} source - Display name string to validate
 * @returns {string} Validated display name
 * @throws {Error} If display name format or length is invalid
 */
export function validateAccountDisplayName(source)
{
    const name = String(source ?? "").trim();

    if (name.length === 0 || name.length > 50)
    {
        const err = new Error("Invalid display name length");
        err.status = 400;
        throw err;
    }

    // Unicode letters and numbers allowed, plus space, dot, underscore, hyphen
    if (!/^[\p{L}\p{N}\s._-]+$/u.test(name))
    {
        const err = new Error("Invalid display name format");
        err.status = 400;
        throw err;
    }

    return name;
}

/**
 * Convert account handle to account ID for database operations
 * @param {string} handle - Account handle name
 * @returns {Promise<number>} Account ID
 * @throws {Error} If account not found
 */
export async function toAccountId(handle)
{
    const account = await getAccount(handle);

    if (!account)
    {
        throw new Error("Account not found");
    }

    return account.id;
}

