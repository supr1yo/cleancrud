import type { Request, Response } from 'express';
import prisma from '../../lib/db';
import { ZodError } from 'zod';
import productSchema from '../../validation/product';

export default async function createProduct(req: Request, res: Response) {
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
        res.status(201).json(product);
        return;
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ reason: 'Validation failed', details: error.issues });
            return;
        }
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
}
