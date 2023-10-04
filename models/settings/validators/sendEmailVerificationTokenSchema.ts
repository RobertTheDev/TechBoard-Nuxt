import { object, string, z } from 'zod';

// Zod validation schema defines fields required for sending an email verification token.
const sendEmailVerificationTokenSchema = object({
  emailAddress: string({
    invalid_type_error: 'Email address must be a string.',
    required_error: 'Email address is required.',
  })
    .email('Email address must be a valid email format.')
    .nonempty('Email address cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type SendEmailVerificationTokenSchemaType = z.infer<
  typeof sendEmailVerificationTokenSchema
>;

export default sendEmailVerificationTokenSchema;
