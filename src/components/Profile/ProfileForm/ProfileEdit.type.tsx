import diffInYears from '@utils/dates';
import { validatePostalCode } from '@utils/validation';
import { z } from 'zod';

export const AddressSchemaProfile = z
  .object({
    country: z.enum(['PL', 'BY', 'RU'], { message: 'Country is required' }),
    city: z
      .string()
      .min(1, { message: 'City is required' })
      .regex(/[A-zА-я]*$/, { message: 'City must contain only letters' }),
    streetName: z.string().min(1, { message: 'Street is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
    id: z.string(),
  })
  .refine((data) => validatePostalCode(data.country, data.postalCode), {
    message: 'Invalid postal code for selected country',
    path: ['postalCode'],
  });

export type AddressProfileType = z.infer<typeof AddressSchemaProfile>;

const nameCheck = (name: string) =>
  z
    .string()
    .min(1, { message: `${name} is required` })
    .regex(/^[A-ZА-Я][A-zА-я]*$/, {
      message: `${name} must start with an uppercase (contain only letters)`,
    });

const MIN_AGE = 14;
const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() - MIN_AGE;

export const ProfileEditSchema = z.object({
  name: nameCheck('Name'),
  surname: nameCheck('Surname'),
  dateOfBirth: z
    .string()
    .refine((date) => diffInYears(new Date(), new Date(date)) >= MIN_AGE, {
      message: `You must be at least ${MIN_AGE} years old`,
    })
    .refine(
      (date) =>
        new Date(date).getFullYear() >= MIN_YEAR &&
        new Date(date).getFullYear() <= MAX_YEAR,
      {
        message: `Date of birth must be between ${MIN_YEAR} and ${MAX_YEAR}`,
      }
    ),
  Address: z.array(AddressSchemaProfile),
  isDefaultShipping: z.string(),
  isDefaultBilling: z.string(),
});

export type ProfileEditType = z.infer<typeof ProfileEditSchema>;
