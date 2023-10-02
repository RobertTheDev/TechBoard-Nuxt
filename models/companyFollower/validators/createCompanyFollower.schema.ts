import { object, z } from 'zod';

// Zod validation schema defines fields required for creating a company follower.
const createCompanyFollowerSchema = object({});

// Create a TypeScript type from the schema.
export type CreateCompanyFollowerSchemaType = z.infer<
  typeof createCompanyFollowerSchema
>;

export default createCompanyFollowerSchema;
