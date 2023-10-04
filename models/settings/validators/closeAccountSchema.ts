import { string, object, z } from 'zod';

// Zod validation schema defines fields required for closing an account.
const closeAccountSchema = object({
  password: string({
    invalid_type_error: 'Password must be a string.',
    required_error: 'Password is required.',
  }).nonempty('Password cannot be empty.'),
  close: string({
    invalid_type_error: 'Close must be a string.',
    required_error: 'Please type "CLOSE" to close the account',
  })
    .nonempty('Close cannot be empty.')
    .refine((value) => value === 'CLOSE', {
      message: 'Please type "CLOSE" to close the account',
    }),
});

// Create a TypeScript type from the schema.
export type CloseAccountSchemaType = z.infer<typeof closeAccountSchema>;

export default closeAccountSchema;
