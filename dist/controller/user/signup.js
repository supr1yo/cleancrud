"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = signup;
const zod_1 = require("zod");
const db_1 = __importDefault(require("../../lib/db"));
const auth_1 = require("../../lib/auth");
// Import Z schema
const signup_1 = __importDefault(require("../../validation/signup"));
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = signup_1.default.parse(req.body);
            const { email, username, password } = credentials;
            const userExists = yield db_1.default.user.findFirst({
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
            yield db_1.default.user.create({
                data: { email, username, password: yield (0, auth_1.hashPassword)(password) }
            });
            return res.status(200).json({
                reason: 'User has been created successfully',
            });
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ reason: 'Validation failed', details: error.issues });
                return;
            }
            console.log(error);
            return res.status(500).json({
                reason: 'Something went wrong.'
            });
        }
    });
}
//# sourceMappingURL=signup.js.map