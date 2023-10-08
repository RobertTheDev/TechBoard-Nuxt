import { object, string, z } from 'zod';

// Zod validation schema defines fields required for updating a company.
const updateCompanySchema = object({
  category: string({
    invalid_type_error: 'Company category must be a string.',
  })
    .nonempty('Company category cannot be empty.')
    .optional(),
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
    invalid_type_error: 'Company name must be a string.',
  })
    .nonempty('Company name cannot be empty.')
    .optional(),
  totalEmployees: string({
    invalid_type_error: 'Company employees total must be a string.',
  })
    .nonempty('Company employees total cannot be empty.')
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateCompanySchemaType = z.infer<typeof updateCompanySchema>;

export default updateCompanySchema;
