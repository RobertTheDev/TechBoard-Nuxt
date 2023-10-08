import { object, string, z } from 'zod';
import jobInterviewStatusTypes from '../statusTypes/jobInterviewStatusTypes';

// Zod validation schema defines fields required for updating a job interview.
const updateJobInterviewSchema = object({
  startTime: string({
    invalid_type_error: 'Start time is a string.',
  })
    .datetime('Start time must in date time format.')
    .optional(),
  endTime: string({
    invalid_type_error: 'End time is a string.',
  })
    .datetime('Start time must in date time format.')
    .optional(),
  status: string({
    invalid_type_error: 'Job interview must be a string.',
  })
    .refine((value) => jobInterviewStatusTypes.includes(value), {
      message: 'Invalid status. Allowed values are BOOKED or CANCELLED.',
    })
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateJobInterviewSchemaType = z.infer<
  typeof updateJobInterviewSchema
>;

export default updateJobInterviewSchema;
