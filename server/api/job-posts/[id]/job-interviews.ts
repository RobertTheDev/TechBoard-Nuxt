import getJobInterviewsByJobPostId from '~/server/handlers/jobPost/jobInterviews/getJobInterviewsByJobPostId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets job interviews by their matching jon post id from the database.
  if (method === 'GET') {
    try {
      return await getJobInterviewsByJobPostId(event);
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
