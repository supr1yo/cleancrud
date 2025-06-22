import type { Request, Response } from 'express'
import { ZodError } from 'zod'
import prisma from '../../lib/db';
import { comparePassword, signJwt } from '../../lib/auth';

// Import Z schema
import LoginSchema from '../../validation/login';


export default async function login(req: Request, res: Response) {
    try {
        const credentials = LoginSchema.parse(req.body);
        const { username, password } = credentials;

        const user = await prisma.user.findFirst({ where: { username } });

        const isValid = user && await comparePassword(password, user.password);

        if (!user || !isValid) {
        res.status(404).json({ reason: 'User not found' });
        return;
        }

        const token = await signJwt({ id: user.id, email: user.email });

        res.cookie('cleancookie', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 5 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ reason: 'User logged in successfully' });
        return;

    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({ reason: 'Validation failed', details: error.issues });
            return;
        }
        console.log(error)
        res.status(500).json({
            reason: 'Something went wrong.'
        });
        return;
    }
}
