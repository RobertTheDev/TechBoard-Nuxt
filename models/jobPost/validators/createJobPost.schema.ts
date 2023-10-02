import { object, date, string } from "yup";

const createJobPostSchema = object({
  companyId: string(),
  createdAt: date().default(() => new Date()),
  title: string().notRequired().default(null),
}).unknown(false);

export default createJobPostSchema;
