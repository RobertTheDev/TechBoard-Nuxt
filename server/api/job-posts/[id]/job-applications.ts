import getJobApplicationsByJobPostId from '~/server/handlers/jobPost/jobApplications/getJobApplicationsByJobPostId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets job applications by their matching jon post id from the database.
  if (method === 'GET') {
    try {
      return await getJobApplicationsByJobPostId(event);
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
