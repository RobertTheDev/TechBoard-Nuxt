import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a company.
const createCompanySchema = object({});

// Create a TypeScript type from the schema.
export type CreateCompanySchemaType = z.infer<typeof createCompanySchema>;

export default createCompanySchema;
