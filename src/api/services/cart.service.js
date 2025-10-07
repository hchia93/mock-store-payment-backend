import prisma from "../../api/prisma.js"


export async function addToCart(accountHandle, items)
{
    console.log("service received:", accountHandle, items);
}