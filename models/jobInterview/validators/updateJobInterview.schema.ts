import { object, z } from 'zod';

// Zod validation schema defines fields required for updating a job interview.
const updateJobInterviewSchema = object({});

// Create a TypeScript type from the schema.
export type UpdateJobInterviewSchemaType = z.infer<
  typeof updateJobInterviewSchema
>;

export default updateJobInterviewSchema;
