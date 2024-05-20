import { AddressSchema } from '@components/AddressFields/AddressFields.types';
import diffInYears from '@utils/dates';
import { z } from 'zod';

const nameCheck = (name: string) =>
  z
    .string()
    .min(1, { message: `${name} is required` })
    .regex(/^[A-ZА-Я][A-zА-я]*$/, {
      message: `${name} must start with an uppercase (contain only letters)`,
    });

const MIN_AGE = 14;

export const SignUpFormSchema = z
  .object({
    name: nameCheck('Name'),
    surname: nameCheck('Surname'),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/\d/, { message: 'Password must contain at least one number' })
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    dateOfBirth: z
      .string()
      .refine((date) => diffInYears(new Date(), new Date(date)) >= MIN_AGE, {
        message: `You must be at least ${MIN_AGE} years old`,
      }),
    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,
    useSameAddress: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
