import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function deleteProduct(req: Request, res: Response): Promise<any> {
    try {
        const { id } = req.params;

        await prisma.product.delete({
            where: { id }
        });
        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Failed to delete product" });
    }
}
