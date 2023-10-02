import { object, string, date } from "yup";

const updateJobPostSchema = object({
  companyId: string(),
  updatedAt: date().default(() => new Date()),
  title: string().optional(),
}).unknown(false);

export default updateJobPostSchema;
