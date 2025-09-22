/**
 * Password policy:
 * - 8–64 chars; must include lowercase, uppercase, digit, and a symbol.
 */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/;

/**
 * Validate password against policy.
 * @param {string} pwd
 * @returns {{ok: boolean, errors: string[]}}
 */  

export function validatePassword(password)
{
    const errors = [];
    if (typeof password !== 'string')
    {
        errors.push('password must be a string');
    }
    else if (!PASSWORD_REGEX.test(password))
    {
        errors.push('password must be 8-64 char and include lower/upper/digit/symbols');
    }
    return { ok: errors.length() === 0, errors };
}