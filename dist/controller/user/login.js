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
exports.default = login;
const zod_1 = require("zod");
const db_1 = __importDefault(require("../../lib/db"));
const auth_1 = require("../../lib/auth");
// Import Z schema
const login_1 = __importDefault(require("../../validation/login"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const credentials = login_1.default.parse(req.body);
            const { username, password } = credentials;
            const user = yield db_1.default.user.findFirst({ where: { username } });
            const isValid = user && (yield (0, auth_1.comparePassword)(password, user.password));
            if (!user || !isValid) {
                res.status(404).json({ reason: 'User not found' });
                return;
            }
            const token = yield (0, auth_1.signJwt)({ id: user.id, email: user.email });
            res.cookie('cleancookie', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 5 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json({ reason: 'User logged in successfully' });
            return;
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({ reason: 'Validation failed', details: error.issues });
                return;
            }
            console.log(error);
            res.status(500).json({
                reason: 'Something went wrong.'
            });
            return;
        }
    });
}
//# sourceMappingURL=login.js.map