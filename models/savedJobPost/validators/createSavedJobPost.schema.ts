import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a saved job post.
const createSavedJobPostSchema = object({
  jobPostId: string({
    required_error: 'Job post ID is required.',
    invalid_type_error: 'Job post ID must be a string.',
  }).nonempty('Job post ID is required.'),
  userId: string({
    required_error: 'Job post ID is required.',
    invalid_type_error: 'Job post ID must be a string.',
  }).nonempty('Job post ID is required.'),
});

// Create a TypeScript type from the schema.
export type CreateSavedJobPostSchemaType = z.infer<
  typeof createSavedJobPostSchema
>;

export default createSavedJobPostSchema;
