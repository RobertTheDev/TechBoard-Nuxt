import createJobPost from '~/server/handlers/jobPost/createJobPost';
import getJobPosts from '~/server/handlers/jobPost/getJobPosts';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets all job posts from the database.
  if (method === 'GET') {
    try {
      // Find and return all the job posts from the db.
      return await getJobPosts();
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }
  // This handler validates the body and of successful creates a new job post in the database.
  if (method === 'POST') {
    try {
      return await createJobPost(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }
});
