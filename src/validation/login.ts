import { z } from 'zod'

const LoginSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(8, "Password cannot be empty")
});

export default LoginSchema;