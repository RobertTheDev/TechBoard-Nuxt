import { object, z } from 'zod';

// Zod validation schema defines fields required for updating a job application.
const updateJobApplicationSchema = object({});

// Create a TypeScript type from the schema.
export type UpdateJobApplicationSchemaType = z.infer<
  typeof updateJobApplicationSchema
>;

export default updateJobApplicationSchema;
