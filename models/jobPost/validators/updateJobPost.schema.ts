import { number, object, string, z } from "zod";

// Zod validation schema defines fields required for creating a car.
const updateJobPostSchema = object({
  updatedAt: z.date().default(() => new Date()),
  title: string({
    invalid_type_error: "Job title must be a string.",
  })
    .nonempty("Job title cannot be empty.")
    .optional(),
});

// Create a TypeScript type from the schema.
export type UpdateJobPostSchemaType = z.infer<typeof updateJobPostSchema>;

export default updateJobPostSchema;
