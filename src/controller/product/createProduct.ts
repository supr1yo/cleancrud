import type { Request, Response } from 'express';
import prisma from '../../services/prisma';

export default async function createProduct(req: Request, res: Response) {
    try {
        const { name, description, price, userId } = req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                listedAt: new Date(),
                price,
                uploadedBy: {
                    connect: { id: userId }
                }
            }
        });
        res.status(201).json(product);
        return;
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}
