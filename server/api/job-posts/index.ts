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

      return {
        success: true,
        data: jobPosts,
      };
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return {
        success: false,
        errorMessage,
      };
    }
  }
  // This handler validates the body and of successful creates a new job post in the database.
  if (method === "POST") {
    try {
      // STEP 1: Validate the request body.
      const body = await readBody(event);

      const validation = await createJobPostSchema.safeParseAsync(body);

      if (!validation.success) {
        return {
          success: false,
          message: validation.error.errors[0].message,
        };
      }

      // STEP 2: Create a new job post in the database.
      const createdJobPost = await jobPostsCollection.insertOne(
        validation.data
      );

      // STEP 3: Find and return the created job post from the database.
      const jobPost = await jobPostsCollection.findOne({
        _id: new ObjectId(createdJobPost.insertedId),
      });

      return {
        success: true,
        data: jobPost,
      };
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return {
        success: false,
        message: errorMessage,
      };
    }
  }
});
