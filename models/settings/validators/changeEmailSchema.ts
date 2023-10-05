import { object, string, z } from 'zod';

// Zod validation schema defines fields required for changing an email address.
const changeEmailSchema = object({
  newEmailAddress: string({
    required_error: 'New email address is required.',
    invalid_type_error: 'New email address must be a string.',
  })
    .email('New email address must be in valid email format.')
    .nonempty('New email address cannot be empty.'),
  password: string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  }).nonempty('Password cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type ChangeEmailSchemaType = z.infer<typeof changeEmailSchema>;

export default changeEmailSchema;
