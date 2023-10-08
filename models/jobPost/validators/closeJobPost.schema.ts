import { string, object, z } from 'zod';

// Zod validation schema defines fields required for closing a job post.
const closeJobPostSchema = object({
  confirmDelete: string({
    invalid_type_error: 'Confirm delete must be a string.',
    required_error: 'Please type "DELETE" to close the job post.',
  })
    .nonempty('Please type "DELETE" to close the job post.')
    .refine((value) => value === 'DELETE', {
      message: 'Please type "DELETE" to close the job post.',
    }),
});

// Create a TypeScript type from the schema.
export type closeJobPostSchemaType = z.infer<typeof closeJobPostSchema>;

export default closeJobPostSchema;
