import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";
import winstonLogger from "~/server/lib/logger/winston/winstonLogger";
import { H3Event, EventHandlerRequest } from "h3";

// This handler queries the database to get all the job posts.

export default async function getJobPosts(event: H3Event<EventHandlerRequest>) {
  try {
    // Find and return all the job posts from the db.
    const jobPosts = await jobPostsCollection.find().toArray();

    return jobPosts;
  } catch (error) {
    // If an error occurs then log the error and return an unsuccessful statement.
    const errorMessage = (error as Error).message;
    winstonLogger.error(
      `Error in route ${event.node.req.method} ${event.node.req.originalUrl}: ${errorMessage}`
    );
    return error;
  }
}
