import { string, object, z } from 'zod';

// Zod validation schema defines fields required for sending a password reset token.
const sendPasswordResetTokenSchema = object({
  emailAddress: string({
    invalid_type_error: 'Email address must be a string.',
    required_error: 'Email address is required.',
  })
    .email({ message: 'Email address must be in valid email format.' })
    .nonempty({ message: 'Email address cannot be empty.' }),
});

// Create a TypeScript type from the schema.
export type SendPasswordResetTokenSchemaType = z.infer<
  typeof sendPasswordResetTokenSchema
>;

export default sendPasswordResetTokenSchema;
