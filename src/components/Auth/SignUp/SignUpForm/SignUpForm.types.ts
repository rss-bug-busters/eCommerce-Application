import diffInYears from '@utils/dates';
import { validatePostalCode } from '@utils/validation';
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
    address: z.object({
      country: z.enum(['PLN', 'BLR', 'RUS'], { message: 'Country is required' }),
      // .refine(
      //   (postalCode, context) => validatePostalCode(context.parent.country, postalCode),
      //   { message: 'Invalid postal code for selected country' }
      // ),
      city: z
        .string()
        .min(1, { message: 'City is required' })
        .regex(/[A-zА-я]*$/, { message: 'City must contain only letters' }),
      street: z.string().min(1, { message: 'Street is required' }),
      postalCode: z.string().min(1, { message: 'Postal code is required' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => validatePostalCode(data.address.country, data.address.postalCode), {
    message: 'Invalid postal code for selected country',
    path: ['address', 'postalCode'],
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;
