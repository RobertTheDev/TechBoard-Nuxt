import { object, string, z } from 'zod';

// Zod validation schema defines fields required for updating a job post.
const updateJobPostSchema = object({
  title: string({
    invalid_type_error: 'Job title must be a string.',
  })
    .nonempty('Job title cannot be empty.')
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateJobPostSchemaType = z.infer<typeof updateJobPostSchema>;

export default updateJobPostSchema;
