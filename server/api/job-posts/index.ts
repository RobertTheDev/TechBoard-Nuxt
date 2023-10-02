import { ObjectId } from "mongodb";
import createJobPostSchema from "~/models/jobPost/validators/createJobPost.schema";
import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";
import winstonLogger from "~/server/lib/logger/winston/winstonLogger";

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets all job posts from the database.
  if (method === "GET") {
    try {
      // Find and return all the job posts from the db.
      const jobPosts = await jobPostsCollection.find().toArray();

      return jobPosts;
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }
  // This handler validates the body and of successful creates a new job post in the database.
  if (method === "POST") {
    try {
      // STEP 1: Validate the request body.
      const body = await readBody(event);

      const validation = await createJobPostSchema.safeParseAsync(body);

      if (!validation.success) {
        throw createError({
          statusCode: 400,
          statusMessage: validation.error.errors[0].message,
        });
      }

      // STEP 2: Create a new job post in the database.
      const createdJobPost = await jobPostsCollection.insertOne({
        createdAt: new Date(),
        ...validation.data,
      });

      if (!createdJobPost) {
        throw createError({
          statusCode: 400,
          statusMessage:
            "There was an error trying to create the job post. Please try again.",
        });
      }

      // STEP 3: Find and return the created job post from the database.
      const jobPost = await jobPostsCollection.findOne({
        _id: new ObjectId(createdJobPost.insertedId),
      });

      if (!jobPost) {
        throw createError({
          statusCode: 400,
          statusMessage: "No user was found with the provided id.",
        });
      }

      return jobPost;
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }
});
