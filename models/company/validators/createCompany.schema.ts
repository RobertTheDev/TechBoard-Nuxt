import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a company.
const createCompanySchema = object({
  category: string({
    required_error: 'A company category is required.',
    invalid_type_error: 'Company category must be a string.',
  }).nonempty('Company category cannot be empty.'),
  coverImageUrl: string({
    invalid_type_error: 'Company cover image URL must be a string.',
  })
    .url('Company cover image URL must be in URL format.')
    .nonempty('Company cover image URL cannot be empty.')
    .optional(),
  description: string({
    invalid_type_error: 'Company description must be a string.',
  })
    .nonempty('Company category cannot be empty.')
    .optional(),
  logoUrl: string({
    invalid_type_error: 'Company logo URL must be a string.',
  })
    .url('Company logo URL must be in URL format.')
    .nonempty('Company logo URL cannot be empty.')
    .optional(),
  name: string({
    required_error: 'A company name is required.',
    invalid_type_error: 'Company name must be a string.',
  }).nonempty('Company name cannot be empty.'),
  totalEmployees: string({
    required_error: 'A company employees is required.',
    invalid_type_error: 'Company employees must be a string.',
  }).nonempty('Company employees cannot be empty.'),
});

// Create a TypeScript type from the schema.
export type CreateCompanySchemaType = z.infer<typeof createCompanySchema>;

export default createCompanySchema;
