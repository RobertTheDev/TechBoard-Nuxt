import { object, string, z } from 'zod';
import jobOfferStatusTypes from '../statusTypes/jobOfferStatusTypes';

// Zod validation schema defines fields required for updating a job offer.
const updateJobOfferSchema = object({
  status: string({
    invalid_type_error: 'Job offer status must be a string.',
  })
    .refine((value) => jobOfferStatusTypes.includes(value), {
      message:
        'Invalid status. Allowed values are ACCEPTED, OFFERED or REJECTED.',
    })
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateJobOfferSchemaType = z.infer<typeof updateJobOfferSchema>;

export default updateJobOfferSchema;
