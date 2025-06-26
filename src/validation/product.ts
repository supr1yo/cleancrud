import { z } from 'zod';

const productSchema = z.object({
    name: z.string().min(10),
    description: z.string().min(20),
    price: z.string(),
    userId: z.string()
})

export default productSchema;