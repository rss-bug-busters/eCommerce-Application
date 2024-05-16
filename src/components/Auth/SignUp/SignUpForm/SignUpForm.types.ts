import { z } from 'zod';

export const SignUpFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Name is required' }),
    surname: z.string().min(1, { message: 'Surname is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(1, { message: 'Password is required' }),
    confirmPassword: z.string().min(1, { message: 'Password is required' }),
    dateOfBirth: z.string(),
    address: z.object({
      country: z.string().min(1, { message: 'Country is required' }),
      city: z.string().min(1, { message: 'City is required' }),
      street: z.string().min(1, { message: 'Street is required' }),
      postalCode: z.string().min(1, { message: 'Postal code is required' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
