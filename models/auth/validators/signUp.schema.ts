import { object, string, z } from 'zod';

// Zod validation schema defines fields required for signing up a user.
const signUpSchema = object({
  emailAddress: string({
    required_error: 'Email address is required.',
    invalid_type_error: 'Email address must be a string.',
  })
    .min(1, { message: 'Email address cannot be empty.' })
    .email({ message: 'Email address must be a valid email format.' })
    .nonempty({ message: 'Email address is required.' }),
  emailVerified: z.string().nullable().default(null),
  firstName: string({
    required_error: 'First name is required.',
    invalid_type_error: 'First name must be a string.',
  })
    .min(1, { message: 'First name cannot be empty.' })
    .nonempty({ message: 'First name is required.' }),
  lastName: string({
    required_error: 'Last name is required.',
    invalid_type_error: 'Last name must be a string.',
  })
    .min(1, { message: 'Last name cannot be empty.' })
    .nonempty({ message: 'Last name is required.' }),
  password: string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.',
  })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one capital letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message:
        'Password must contain at least one special character (e.g., !@#$%^&*()).',
    }),
});

// Create a TypeScript type from the schema.
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default signUpSchema;
