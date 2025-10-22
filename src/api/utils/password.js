import bcrypt from 'bcryptjs'

const DEFAULT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

/**
 * Hash a plain text password using bcrypt.
 * @param {string} password - Plain text password to hash
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) 
{
    return bcrypt.hash(password, DEFAULT_SALT_ROUNDS)
}

/**
 * Compare a plain text password to a hash.
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password to compare against
 * @returns {Promise<boolean>} True if passwords match
 */
export async function verifyPassword(password, hash)
{
    return bcrypt.compare(password, hash);
}
