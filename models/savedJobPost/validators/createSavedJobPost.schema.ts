import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a saved job post.
const createJobPostSchema = object({
  jobPostId: string({
    required_error:
      'A job post ID is required. Please provide an ID for the job post you are saving.',
    invalid_type_error: 'Job post ID must be a string.',
  }).nonempty('Job post ID cannot be empty.'),
  userId: string({
    required_error:
      'A user ID is required. Please provide a user ID for the job post you are saving.',
    invalid_type_error: 'User ID must be a string.',
  }).nonempty('User ID cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type CreateJobPostSchemaType = z.infer<typeof createJobPostSchema>;

export default createJobPostSchema;
