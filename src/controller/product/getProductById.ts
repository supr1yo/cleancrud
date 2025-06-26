import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ reason: 'Product ID is required.' });
            return;
        }
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            res.status(404).json({ reason: 'Product not found.' });
            return;
        }
        res.status(200).json(product);
        return;
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ reason: 'Something went wrong.' });
    }
}
