/**
 * Password policy regex pattern:
 * - 8–64 characters
 * - Must include lowercase letter
 * - Must include uppercase letter  
 * - Must include digit
 * - Must include symbol (non-word, non-space character)
 */
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/;

/**
 * Validate password against security policy.
 * @param {string} password - Password to validate
 * @returns {{ok: boolean, errors: string[]}} Validation result with error details
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
    return { ok: errors.length === 0, errors };
}