import createJobPost from '~/server/handlers/jobPost/createJobPost';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler creates a new job post for a company.

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
});
