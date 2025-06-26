import { Router } from 'express';
import login from '../controller/user/login';
import signup from '../controller/user/signup';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User created successfully
 *       409:
 *         description: User already exists
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Server error
 */
router.post('/signup', signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Server error
 */
router.post('/login', login);

export default router;
