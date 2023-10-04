import { object, string, z } from 'zod';

// Zod validation schema defines fields required for verifying an email verification token.
const verifyEmailSchema = object({
  emailVerificationToken: string({
    invalid_type_error: 'Email verification token must be a string.',
    required_error: 'Email verification token is required.',
  }).nonempty('Email verification token cannot be empty.'),
});

export default verifyEmailSchema;
