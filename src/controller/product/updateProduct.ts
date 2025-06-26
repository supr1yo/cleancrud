import type { Request, Response } from 'express';
import prisma from '../../lib/db';
import productSchema from '../../validation/product';
import { ZodError } from 'zod';

export default async function updateProduct(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.params;
        const validated = productSchema.parse(req.body);
        const { name, description, price, userId } = validated;

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
        return res.status(200).json(product);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ reason: 'Validation failed', details: error.issues });
        }
        console.error("Error updating product:", error);
        return res.status(500).json({ error: "Failed to update product" });
    }
}
