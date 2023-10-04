import createJobPost from '~/server/handlers/jobPost/createJobPost';
import getJobPosts from '~/server/handlers/jobPost/getJobPosts';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets all job posts from the database.
  if (method === 'GET') {
    try {
      return await getJobPosts();
    } catch (error) {
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
      const body = await readBody(event);

      return await createJobPost(body);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
});
