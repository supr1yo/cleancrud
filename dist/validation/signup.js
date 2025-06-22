"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const signupSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8, "Password cannot be empty")
});
exports.default = signupSchema;
//# sourceMappingURL=signup.js.map