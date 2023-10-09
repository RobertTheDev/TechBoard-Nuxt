import { object, string, z } from 'zod';
import companyEmployeeValues from '../values/companyEmployeeValues';
import companyCategoryValues from '../values/companyCategoryValues';

// Zod validation schema defines fields required for creating a company.
const createCompanySchema = object({
  category: string({
    required_error: 'A company category is required.',
    invalid_type_error: 'Company category must be a string.',
  }).refine((value) => companyCategoryValues.includes(value), {
    message: 'The value entered is not valid.',
  }),
  coverImageUrl: string({
    invalid_type_error: 'Company cover image URL must be a string.',
  })
    .url('Company cover image URL must be in URL format.')
    .nonempty('Company cover image URL is required.')
    .optional(),
  description: string({
    invalid_type_error: 'Company description must be a string.',
  })
    .nonempty('Company category is required.')
    .optional(),
  logoUrl: string({
    invalid_type_error: 'Company logo URL must be a string.',
  })
    .url('Company logo URL must be in URL format.')
    .nonempty('Company logo URL is required.')
    .optional(),
  name: string({
    required_error: 'A company name is required.',
    invalid_type_error: 'Company name must be a string.',
  }).nonempty('Company name is required.'),
  totalEmployees: string({
    required_error: 'Total company employees is required.',
    invalid_type_error: 'Total company employees must be a string.',
  }).refine((value) => companyEmployeeValues.includes(value), {
    message: 'The value entered is not valid.',
  }),
});

// Create a TypeScript type from the schema.
export type CreateCompanySchemaType = z.infer<typeof createCompanySchema>;

export default createCompanySchema;
