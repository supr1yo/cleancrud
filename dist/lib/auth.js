"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
exports.verifyJwt = verifyJwt;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET cannot be empty.');
// Create token
function signJwt(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: '5d',
        algorithm: 'ES256',
        issuer: 'cleancrud'
    });
}
// Verify token
function verifyJwt(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET, {
        issuer: 'cleancrud'
    });
}
// Hash password
function hashPassword(password) {
    return bcrypt_1.default.hash(password, 10);
}
// Compare password
function comparePassword(plain, hashed) {
    return bcrypt_1.default.compare(plain, hashed);
}
//# sourceMappingURL=auth.js.map