import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import prisma from '../../lib/db';
import { hashPassword } from '../../lib/auth';

// Import Z schema
import signupSchema from '../../validation/signup';


export default async function signup(req: Request, res: Response) {
    try {
        const credentials = signupSchema.parse(req.body);
        const { email, username, password } = credentials;

        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ]
            }
        });

        if (userExists) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        await prisma.user.create({
            data: { email, username, password: await hashPassword(password) }
        })

        return res.status(200).json({
            reason: 'User has been created successfully',
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ reason: 'Validation failed', details: error.issues });
            
        }
        console.log(error)
        return res.status(500).json({ reason: 'Something went wrong.' });
    }
}
