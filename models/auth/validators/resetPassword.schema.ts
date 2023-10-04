import { object, string, z } from 'zod';

// Zod validation schema defines fields required for resetting a user's password.
const resetPasswordSchema = object({
  password: string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one capital letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Password must contain at least one special character',
    })
    .nonempty({ message: 'Password is required.' }),
});

// Create a TypeScript type from the schema.
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export default resetPasswordSchema;