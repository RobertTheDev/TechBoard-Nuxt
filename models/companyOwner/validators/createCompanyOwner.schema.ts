import { object, string, z } from 'zod';

// Zod validation schema defines fields required for creating a company owner.
const createCompanyOwnerSchema = object({
  companyId: string({
    required_error: 'Company ID is required.',
    invalid_type_error: 'Company ID must be a string.',
  }).nonempty('Company ID is required.'),
  userId: string({
    required_error: 'User ID is required.',
    invalid_type_error: 'User ID must be a string.',
  }).nonempty('User ID is required.'),
});

// Create a TypeScript type from the schema.
export type CreateCompanyOwnerSchemaType = z.infer<
  typeof createCompanyOwnerSchema
>;

export default createCompanyOwnerSchema;
