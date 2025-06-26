import type { Request, Response } from 'express';
import prisma from '../../lib/db';
import { ZodError } from 'zod';
import productSchema from '../../validation/product';

export default async function createProduct(req: Request, res: Response): Promise<any> {
    try {
        const validated = productSchema.parse(req.body);
        const { name, description, price, userId } = validated;

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
        return res.status(201).json(product);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ reason: 'Validation failed', details: error.issues });
        }
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Failed to create product" });
    }
}
