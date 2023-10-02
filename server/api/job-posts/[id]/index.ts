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
        throw createError({
          statusCode: 400,
          statusMessage: "No job post was found with that id.",
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

  // This handler deletes a job post by its unique id from the database.
  if (method === "DELETE") {
    try {
      // Delete a job post from the db using its unique id.
      const deletedJobPost = await jobPostsCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (!deletedJobPost) {
        throw createError({
          statusCode: 400,
          statusMessage: "Could not delete the job post. Please try again.",
        });
      }

      return {
        statusMessage: "The job post was successfully deleted.",
      };
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }

  // This handler updates a job post by its unique id from the database.
  if (method === "PUT") {
    try {
      // STEP 1: Validate the request body.
      const body = await readBody(event);

      const validation = await updateJobPostSchema.safeParseAsync(body);

      if (!validation.success) {
        throw createError({
          statusCode: 400,
          statusMessage: validation.error.errors[0].message,
        });
      }

      // STEP 2: Update the job post by its id with the validated data.
      const updatedJobPost = await jobPostsCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: validation.data }
      );

      if (!updatedJobPost) {
        throw createError({
          statusCode: 400,
          statusMessage: "No user was found with the provided id.",
        });
      }

      // STEP 3: Find and return the job post by its unique id.
      const findJobPost = await jobPostsCollection.findOne({
        _id: new ObjectId(updatedJobPost._id),
      });

      return findJobPost;
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
