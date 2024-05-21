import { validatePostalCode } from '@utils/validation';
import { z } from 'zod';

export const AddressSchema = z
  .object({
    country: z.enum(['PL', 'BY', 'RU'], { message: 'Country is required' }),
    city: z
      .string()
      .min(1, { message: 'City is required' })
      .regex(/[A-zА-я]*$/, { message: 'City must contain only letters' }),
    streetName: z.string().min(1, { message: 'Street is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
  })
  .refine((data) => validatePostalCode(data.country, data.postalCode), {
    message: 'Invalid postal code for selected country',
    path: ['postalCode'],
  });

export type AddressType = z.infer<typeof AddressSchema>;
