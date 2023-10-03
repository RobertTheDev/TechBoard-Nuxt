import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a company.
const createCompanySchema = object({
  name: string({
    required_error: 'A company name is required.',
    invalid_type_error: 'Company name must be a string.',
  }).nonempty('Company name cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type CreateCompanySchemaType = z.infer<typeof createCompanySchema>;

export default createCompanySchema;
