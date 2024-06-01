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
  Address: z.array(AddressSchema),
  isDefaultShipping: z.string(),
  isDefaultBilling: z.string(),
});

export type ProfileEditType = z.infer<typeof ProfileEditSchema>;
