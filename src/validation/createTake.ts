import { z } from 'zod'

const objectIdSchema = z.string().regex(/^[a-f\d]{24}$/i, {
  message: 'Invalid ObjectId format',
});


const taskSchema = z.object({
  userId: objectIdSchema,
  title: z.string().min(10, { message: 'Title must be at least 10 characters' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters' }),
  isComplete: z.boolean(),
});

export default taskSchema;