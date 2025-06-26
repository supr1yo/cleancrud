import type { Request, Response } from 'express';
import prisma from '../../lib/db';

export default async function getAllProducts(req: Request, res: Response): Promise<any> {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ reason: 'Something went wrong.' });
  }
}
