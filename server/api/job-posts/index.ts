import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

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
      return {
        success: false,
        errorMessage,
      };
    }
  }
});
