import { z } from 'zod'

const signupSchema = z.object({
    email: z.string().email(),
    username: z.string().min(6,),
    password: z.string().min(8, "Password cannot be empty")
});

export default signupSchema;