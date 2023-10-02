import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a job interview.
const createJobInterviewSchema = object({});

// Create a TypeScript type from the schema.
export type CreateJobInterviewSchemaType = z.infer<
  typeof createJobInterviewSchema
>;

export default createJobInterviewSchema;
