import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;
