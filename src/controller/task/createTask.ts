import type { Request, Response } from 'express';
import { z, ZodError } from 'zod';
import prisma from '../../lib/db';
import taskSchema from '../../validation/createTake';


export default async function createTask(req: Request, res: Response) {
  try {

    const { title, description, isComplete, userId } = taskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title,
        description,
        isComplete,
        userId,
        createdAt: new Date(),
      },
    });

    return res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.errors });
    }

    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
