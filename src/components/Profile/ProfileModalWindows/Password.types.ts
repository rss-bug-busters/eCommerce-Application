import { z } from 'zod';

export const PasswordSchema = z.object({
  currentPassword: z.string().regex(/[A-ZА-Я]/, {
    message: 'Password must contain at least one uppercase letter',
  }),
  newPassword: z.string().regex(/[A-ZА-Я]/, {
    message: 'Password must contain at least one uppercase letter',
  }),
});

export type PasswordFormType = z.infer<typeof PasswordSchema>;
