import { object, string, z } from 'zod';
import companyEmployeeValues from '../values/companyEmployeeValues';
import companyCategoryValues from '../values/companyCategoryValues';

// Zod validation schema defines fields required for updating a company.
const updateCompanySchema = object({
  category: string({
    invalid_type_error: 'Company category must be a string.',
  })
    .refine((value) => companyCategoryValues.includes(value), {
      message: 'The value entered is not valid.',
    })
    .optional(),
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
    invalid_type_error: 'Company name must be a string.',
  })
    .nonempty('Company name is required.')
    .optional(),
  totalEmployees: string({
    invalid_type_error: 'Total company employees must be a string.',
  })
    .refine((value) => companyEmployeeValues.includes(value), {
      message: 'The value entered is not valid.',
    })
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateCompanySchemaType = z.infer<typeof updateCompanySchema>;

export default updateCompanySchema;
