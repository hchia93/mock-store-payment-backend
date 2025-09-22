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
            next();
        }
    };
}