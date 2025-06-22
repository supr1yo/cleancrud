"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const LoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(6),
    password: zod_1.z.string().min(8, "Password cannot be empty")
});
exports.default = LoginSchema;
//# sourceMappingURL=login.js.map