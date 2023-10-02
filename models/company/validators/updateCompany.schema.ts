import { object, z } from 'zod';

// Zod validation schema defines fields required for updating a company.
const updateCompanySchema = object({});

// Create a TypeScript type from the schema.
export type UpdateCompanySchemaType = z.infer<typeof updateCompanySchema>;

export default updateCompanySchema;
