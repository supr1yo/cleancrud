import type { Request, Response } from 'express';
import prisma from '../../services/prisma';

export default async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name, description, price, userId } = req.body;

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                uploadedBy: {
                    connect: { id: userId }
                }
            }
        });
        res.status(200).json(product);
        return;
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
}
