import { string, object, z } from 'zod';

// Zod validation schema defines fields required for sending a password reset email.
const sendPasswordResetSchema = object({
  emailAddress: string()
    .email({ message: 'Email address must be in valid email format.' })
    .min(1, { message: 'Email address cannot be empty.' })
    .nonempty({ message: 'Email address is required.' }),
});

// Create a TypeScript type from the schema.
export type SendPasswordResetSchemaType = z.infer<
  typeof sendPasswordResetSchema
>;

export default sendPasswordResetSchema;
