import { object, string, z } from 'zod';
import jobInterviewStatusTypes from '../statusTypes/jobInterviewStatusTypes';

// Zod validation schema defines fields required for creating a job interview.
const createJobInterviewSchema = object({
  startTime: string({
    required_error: 'Start time is required.',
    invalid_type_error: 'Start time is a string.',
  }).datetime('Start time must in date time format.'),
  endTime: string({
    required_error: 'End time is required.',
    invalid_type_error: 'End time is a string.',
  }).datetime('Start time must in date time format.'),
  status: string({
    required_error: 'Job interview status is required.',
    invalid_type_error: 'Job interview must be a string.',
  })
    .default('SENT')
    .refine((value) => jobInterviewStatusTypes.includes(value), {
      message: 'Invalid status. Allowed values are BOOKED or CANCELLED.',
    }),
});

// Create a TypeScript type from the schema.
export type CreateJobInterviewSchemaType = z.infer<
  typeof createJobInterviewSchema
>;

export default createJobInterviewSchema;
