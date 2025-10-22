import prisma from "../../api/prisma.js";
import { getAccount } from "../../api/services/account.service.js";

/**
 * Get cart items for a specific account
 * @param {string} handle - The account handle name
 * @returns {Promise<Object>} Cart data with account info and items
 */
export async function getCart(handle)
{
    const account = await getAccount(handle);

    const cartItems = await prisma.cart.findMany({
        where: { account_id: account.id },
        include: { product: true }
    });

    return { account: account.handle_name, items: cartItems };
}

/**
 * Add items to cart for a specific account
 * @param {string} handle - The account handle name
 * @param {Array<{productId?: number, bundleId?: number, quantity: number, isBundle?: boolean}>} items - Array of items to add
 * @returns {Promise<Object>} Result of the operation with updated items
 * @throws {Error} If quantity is invalid or price version not found
 */
export async function addToCart(handle, items)
{
    const account = await getAccount(handle);
    const results = [];

    for (const item of items)
    {
        const isBundle = !!item.isBundle;
        const quantity = Number(item.quantity ?? 1);
        
        if (isNaN(quantity) || quantity <= 0)
        {
            throw new Error("Invalid quantity");
        }

        // Determin type and fetch latest price
        let latestPrice = 0;
        if (isBundle)
        {
            const version = await prisma.bundle_price_version.findFirst({
                where: { bundle_id: item.bundle_id },
                orderBy: { version : "desc" }
            });

            if (!version) throw new Error("Bundle has no price version");

            latestPrice = version.price;
        }
        else
        {
            const version = await prisma.product_price_version.findFirst({
                where: { product_id: item.product_id },
                orderBy: { version : "desc" }
            });

            if (!version) throw new Error("Product has no price version");

            latestPrice = version.price;
        }

        // Perform upsert
        const result = await prisma.cart.upsert({
            where: 
            {
                account_id_product_id: isBundle 
                ? undefined 
                : { account_id : account.id, product_id: item.product_id }
            },
            update:
            {
                quantity: { increment: quantity },
                price_snapshot: latestPrice
            },
            create:
            {
                account_id: account.id, 
                is_bundle: isBundle,
                product_id: isBundle ? null : item.product_id,
                bundle_id: isBundle ? item.bundle_id : null,
                quantity: quantity,
                price_snapshot: latestPrice
            }
        });

        results.push(result);

    }

    return { message: "Cart updated succesdfully", items: results };
}

/**
 * Remove a specific product from cart
 * @param {string} handle - The account handle name
 * @param {number} productId - Product ID to remove
 * @returns {Promise<Object>} Result with removal count
 */
export async function removeFromCart(handle, productId)
{
    const account = await getAccount(handle);
    const result = await prisma.cart.deleteMany({
        where: { account_id: account.id, product_id: productId }    
    });

    return { message: `Removed product ${productId}`, count: result.count };
}

/**
 * Clear all items from cart for a specific account
 * @param {string} handle - The account handle name
 * @returns {Promise<Object>} Success message
 */
export async function clearCart(handle)
{
    const account = await getAccount(handle);
    await prisma.cart.deleteMany({ where: { account_id: account.id } });

    return { message: "Cart cleared successfully" };
}