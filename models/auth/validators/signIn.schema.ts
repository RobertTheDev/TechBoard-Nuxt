import { object, string, z } from 'zod';

// Zod validation schema defines fields required for signing in a user.
const signInSchema = object({
  emailAddress: string({
    required_error: 'Email address is required.',
    invalid_type_error: 'Email address must be a string.',
  })
    .email('Email address must be in valid email format.')
    .nonempty('Email address is required.'),
  password: string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  }).nonempty('Password is required.'),
});

// Create a TypeScript type from the schema.
export type SignInSchemaType = z.infer<typeof signInSchema>;

export default signInSchema;
