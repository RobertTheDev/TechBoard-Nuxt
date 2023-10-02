import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a job application.
const createJobApplicationSchema = object({});

// Create a TypeScript type from the schema.
export type CreateJobApplicationSchemaType = z.infer<
  typeof createJobApplicationSchema
>;

export default createJobApplicationSchema;
