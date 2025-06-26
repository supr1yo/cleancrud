import type { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../lib/auth';
import { JwtPayload } from 'jsonwebtoken';


interface RequestExtended extends Request {
    user?: string | JwtPayload;
}

export default async function auth(req: RequestExtended, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await verifyJwt(token);

    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized: Invalid token' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    return;
  }
}
