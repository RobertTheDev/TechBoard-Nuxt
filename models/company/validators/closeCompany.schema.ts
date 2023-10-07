import { string, object, z } from 'zod';

// Zod validation schema defines fields required for closing a COMPANY.
const closeCompanySchema = object({
  confirmDelete: string({
    invalid_type_error: 'Confirm delete must be a string.',
    required_error: 'Please type "DELETE" to close the company',
  })
    .nonempty('Please type "DELETE" to close the company')
    .refine((value) => value === 'DELETE', {
      message: 'Please type "DELETE" to close the account',
    }),
});

// Create a TypeScript type from the schema.
export type CloseCompanySchemaType = z.infer<typeof closeCompanySchema>;

export default closeCompanySchema;
