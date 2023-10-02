import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a car.
const createJobPostSchema = object({
  title: string({
    required_error:
      'A job title is required. Please provide a title for the job post you are creating.',
    invalid_type_error: 'Job title must be a string.',
  }).nonempty('Job title cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type CreateJobPostSchemaType = z.infer<typeof createJobPostSchema>;

export default createJobPostSchema;
