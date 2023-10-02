import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a job offer.
const createJobOfferSchema = object({});

// Create a TypeScript type from the schema.
export type CreateJobOfferSchemaType = z.infer<typeof createJobOfferSchema>;

export default createJobOfferSchema;
