import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET as string;

if(!JWT_SECRET) throw new Error('JWT_SECRET cannot be empty.');

// Create token
export function signJwt(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: '5d',
        algorithm: 'ES256',
        issuer: 'cleancrud'
    });
}

// Verify token
export function verifyJwt(token: string): JwtPayload | string { 
    return jwt.verify(token, JWT_SECRET, {
        issuer: 'cleancrud'
    });
}

// Hash password
export function hashPassword(password: string): Promise<string>  {
    return bcrypt.hash(password, 10);
}

// Compare password
export function comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
}
