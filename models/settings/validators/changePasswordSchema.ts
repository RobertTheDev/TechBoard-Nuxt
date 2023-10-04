import { object, string, z } from 'zod';

// Zod validation schema defines fields required for changing a user's password.
const changePasswordSchema = object({
  currentPassword: string({
    invalid_type_error: 'Current password must be a string.',
    required_error: 'Current password is required.',
  }).nonempty('Current password cannot be empty.'),
  newPassword: string({
    invalid_type_error: 'New password must be a string.',
    required_error: 'New password is required.',
  })
    .nonempty('New password cannot be empty.')
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
    .refine((value) => value !== 'currentPassword', {
      message: 'New password must be different from the current password.',
    }),
});

// Create a TypeScript type from the schema.
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export default changePasswordSchema;
