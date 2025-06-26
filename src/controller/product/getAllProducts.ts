import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany({
            include: {
                uploadedBy: true
            }
        });
        return res.status(200).json(products);
        return;
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ reason: 'Something went wrong.' });
    }
}
