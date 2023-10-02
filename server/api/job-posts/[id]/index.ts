import { ObjectId } from "mongodb";
import updateJobPostSchema from "~/models/jobPost/validators/updateJobPost.schema";
import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";
import winstonLogger from "~/server/lib/logger/winston/winstonLogger";

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  const { id } = event.context.params as { id: string };

  // This handler gets a job post by its unique id from the database.
  if (method === "GET") {
    try {
      // Find and return a job post by its unique id from the db.
      const jobPost = await jobPostsCollection.findOne({
        _id: new ObjectId(id),
      });

      if (!jobPost) {
        return {
          success: false,
        };
      }

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
        errorMessage,
      };
    }
  }

  // This handler deletes a job post by its unique id from the database.
  if (method === "DELETE") {
    try {
      // Delete a job post from the db using its unique id.
      const deletedJobPost = await jobPostsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (!deletedJobPost) {
        return {
          success: false,
        };
      }

      return {
        success: true,
        data: {},
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

  // This handler updates a job post by its unique id from the database.
  if (method === "PUT") {
    try {
      // STEP 1: Validate the request body.
      const body = await readBody(event);

      const validation = await updateJobPostSchema.safeParseAsync(body);

      if (!validation.success) {
        return {
          success: false,
        };
      }

      // STEP 2: Update the job post by its id with the validated data.
      const updatedJobPost = await jobPostsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validation.data }
      );

      if (!updatedJobPost) {
        return {
          success: false,
        };
      }

      // STEP 3: Find and return the job post by its unique id.
      const findJobPost = await jobPostsCollection.findOne({
        _id: new ObjectId(updatedJobPost._id),
      });

      return {
        success: true,
        data: findJobPost,
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
});
