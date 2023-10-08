import { object, string, z } from 'zod';
import jobOfferStatusTypes from '../statusTypes/jobOfferStatusTypes';

// Zod validation schema defines fields required for creating a job offer.
const createJobOfferSchema = object({
  status: string({
    invalid_type_error: 'Job offer status must be a string.',
    required_error: 'Job offer status is required.',
  })
    .refine((value) => jobOfferStatusTypes.includes(value), {
      message:
        'Invalid status. Allowed values are ACCEPTED, OFFERED or REJECTED.',
    })
});

// Create a TypeScript type from the schema.
export type CreateJobOfferSchemaType = z.infer<typeof createJobOfferSchema>;

export default createJobOfferSchema;
