import { boolean, number, object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a job post.
const updateJobPostSchema = object({
  title: string({
    required_error:
      'A job title is required. Please provide a title for the job post you are creating.',
    invalid_type_error: 'Job title must be a string.',
  }).nonempty('Job title cannot be empty.'),
  totalApplicants: number({
    required_error: 'Total applicants are required.',
    invalid_type_error: 'Total applicants must be a number,',
  }).default(0),
  published: boolean({
    required_error: 'Published is required.',
    invalid_type_error: 'Published must be a boolean.',
  }).default(false),
  description: boolean({
    invalid_type_error: 'Description must be a string.',
  }).optional(),

  // deadlineDate: date()
  //   .min(new Date(), 'Deadline date cannot be in the past or current date.')
  //   .max(
  //     new Date(new Date().setMonth(new Date().getMonth() + 3)),
  //     'Deadline date cannot be more than 3 months in the future.',
  //   )
  //   .notRequired()
  //   .default(null),
  //   locationType: string()
  //   .notRequired()
  //   .default(null)
  //   .oneOf(['on-premise', 'remote', 'hybrid'], 'Invalid location.'),

  // location: object()
  //   .shape({
  //     fullName: string().required('Full name is required'),
  //     streetAddress: string().required('Street address is required'),
  //     city: string().required('City is required'),
  //     state: string().required('State is required'),
  //     postalCode: string().required('Postal code is required'),
  //     country: string().required('Country is required'),
  //   })
  //   .notRequired()
  //   .default(null),
  //   salary: object()
  //   .shape({
  //     rate: string().notRequired(),
  //     min: number().min(0).notRequired(),
  //     max: number().min(ref('min')).notRequired(),
  //   })
  //   .notRequired()
  //   .default(null),

  // seniorLevel: string()
  //   .notRequired()
  //   .default(null)
  //   .oneOf(['junior', 'mid', 'senior'], 'Invalid level.'),
  // contractType: string()
  //   .notRequired()
  //   .default(null)
  //   .oneOf(['contract', 'full-time', 'part-time'], 'Invalid contract type.'),
});
const contractTypeValues = ['Contract', 'Full-time', 'Part-time'];

const seniorLevelTypeValues = ['Junior', 'Mid', 'Senior'];

const locationTypeValues = ['Hybrid', 'On-premise', 'Remote'];

// Create a TypeScript type from the schema.
export type UpdateJobPostSchemaType = z.infer<typeof updateJobPostSchema>;

export default updateJobPostSchema;
