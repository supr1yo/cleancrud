import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function getProductById(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ reason: 'Product ID is required.' });
        }
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return res.status(404).json({ reason: 'Product not found.' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({ reason: 'Something went wrong.' });
    }
}
