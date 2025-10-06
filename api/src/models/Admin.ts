import { z } from 'zod';

const loginModel = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export { loginModel };




