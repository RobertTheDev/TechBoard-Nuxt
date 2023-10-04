import { object, z } from 'zod';

// Zod validation schema defines fields required for updating a company.
const updateCompanySchema = object({
  name: z
    .string({
      invalid_type_error: 'Company name must be a string.',
      required_error: 'Company name is required.',
    })
    .nonempty('Company name cannot be named.')
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateCompanySchemaType = z.infer<typeof updateCompanySchema>;

export default updateCompanySchema;
