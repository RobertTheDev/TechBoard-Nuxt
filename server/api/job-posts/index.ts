import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";
import winstonLogger from "~/server/lib/logger/winston/winstonLogger";

// This handler gets all job posts from the database.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

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
      };
    }
  }
});
