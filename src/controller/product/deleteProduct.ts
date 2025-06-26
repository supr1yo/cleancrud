import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;

        await prisma.product.delete({
            where: { id }
        });
        res.status(204).send();
        return;
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
}
