import bycrypt from 'bcryptjs'

const DEFAULT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

/**
 * Hash a plain text password.
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) 
{
    return bcrypt.hash(password, DEFAULT_SALT_ROUNDS)
}

/**
 * Compare a plain text password to a hash.
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, hash)
{
    return bycrypt.compare(password.hash);
}
