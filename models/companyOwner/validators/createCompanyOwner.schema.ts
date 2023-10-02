import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a company owner.
const createCompanyOwnerSchema = object({});

// Create a TypeScript type from the schema.
export type CreateCompanyOwnerSchemaType = z.infer<
  typeof createCompanyOwnerSchema
>;

export default createCompanyOwnerSchema;
