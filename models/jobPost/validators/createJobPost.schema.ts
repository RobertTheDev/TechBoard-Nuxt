import { boolean, date, number, object, string, z } from 'zod';
import contractTypeValues from '../values/contractTypeValues';
import seniorLevelTypeValues from '../values/seniorLevelTypeValues';
import locationTypeValues from '../values/locationTypeValues';
import jobPostStatusValues from '../values/jobPostStatusValues';

// Zod validation schema defines fields required for creating a job post.
const createJobPostSchema = object({
  title: string({
    required_error:
      'A job title is required. Please provide a title for the job post you are creating.',
    invalid_type_error: 'Job title must be a string.',
  }).nonempty('Job title cannot be empty.'),
  // totalApplicants: number({
  //   required_error: 'Total applicants are required.',
  //   invalid_type_error: 'Total applicants must be a number,',
  // }).default(0),
  // description: boolean({
  //   invalid_type_error: 'Description must be a string.',
  // }).optional(),

  // contractType: string({
  //   required_error: 'Contract type is required.',
  //   invalid_type_error: 'Contract type must be a string.',
  // }).refine((value) => contractTypeValues.includes(value), {
  //   message: 'The contract type entered is not valid.',
  // }),

  // seniorLevel: string({
  //   required_error: 'Senior level is required.',
  //   invalid_type_error: 'Senior level must be a string.',
  // }).refine((value) => seniorLevelTypeValues.includes(value), {
  //   message: 'The senior level entered is not valid.',
  // }),

  // locationType: string({
  //   required_error: 'Location type is required.',
  //   invalid_type_error: 'Location type must be a string.',
  // }).refine((value) => locationTypeValues.includes(value), {
  //   message: 'The location type is not valid.',
  // }),

  // jobPostStatus: string({
  //   required_error: 'Job post status is required.',
  //   invalid_type_error: 'Job post status must be a string.',
  // }).refine((value) => jobPostStatusValues.includes(value), {
  //   message: 'Job post status is not valid.',
  // }),

  // deadlineDate: date()
  //   .min(new Date(), 'Deadline date cannot be in the past or current date.')
  //   .max(
  //     new Date(new Date().setMonth(new Date().getMonth() + 3)),
  //     'Deadline date cannot be more than 3 months in the future.',
  //   ),

  // location: object({
  //   fullName: string(),
  //   streetAddress: string(),
  //   city: string(),
  //   state: string(),
  //   postalCode: string(),
  //   country: string(),
  // }),

  // salary: object({
  //   rate: string(),
  //   min: number().min(0),
  //   max: number().min(0),
  // }),
});

// Create a TypeScript type from the schema.
export type CreateJobPostSchemaType = z.infer<typeof createJobPostSchema>;

export default createJobPostSchema;
