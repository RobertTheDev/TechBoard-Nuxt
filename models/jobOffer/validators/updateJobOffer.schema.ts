import { object, z } from 'zod';

// Zod validation schema defines fields required for updating a job offer.
const updateJobOfferSchema = object({});

// Create a TypeScript type from the schema.
export type UpdateJobOfferSchemaType = z.infer<typeof updateJobOfferSchema>;

export default updateJobOfferSchema;
