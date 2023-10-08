import { object, string, z } from 'zod';
import jobApplicationStatusTypes from '../statusTypes/jobApplicationStatusTypes';

// Zod validation schema defines fields required for creating a job application.
const createJobApplicationSchema = object({
  cvFile: string({
    required_error: 'CV is required.',
    invalid_type_error: 'CV must be a string.',
  }).nonempty('CV is required.'),
  message: string({
    invalid_type_error: 'Message must be a string.',
  }).nonempty('Message cannot be empty.'),
  status: string({
    required_error: 'Job application status is required.',
    invalid_type_error: 'Job application must be a string.',
  })
    .default('SENT')
    .refine((value) => jobApplicationStatusTypes.includes(value), {
      message:
        'Invalid status. Allowed values are ACCEPTED, REJECTED, or SENT.',
    }),
});

// Create a TypeScript type from the schema.
export type CreateJobApplicationSchemaType = z.infer<
  typeof createJobApplicationSchema
>;

export default createJobApplicationSchema;
