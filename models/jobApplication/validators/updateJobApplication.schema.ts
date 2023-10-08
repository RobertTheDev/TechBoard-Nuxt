import { object, string, z } from 'zod';
import jobApplicationStatusTypes from '../statusTypes/jobApplicationStatusTypes';

// Zod validation schema defines fields required for updating a job application.
const updateJobApplicationSchema = object({
  cvFile: string({
    invalid_type_error: 'CV must be a string.',
  })
    .nonempty('CV is required.')
    .optional(),
  message: string({
    invalid_type_error: 'Message must be a string.',
  })
    .nonempty('Message cannot be empty.')
    .optional(),
  status: string({
    invalid_type_error: 'Job application must be a string.',
  })
    .refine((value) => jobApplicationStatusTypes.includes(value), {
      message:
        'Invalid status. Allowed values are ACCEPTED, REJECTED, or SENT.',
    })
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateJobApplicationSchemaType = z.infer<
  typeof updateJobApplicationSchema
>;

export default updateJobApplicationSchema;
