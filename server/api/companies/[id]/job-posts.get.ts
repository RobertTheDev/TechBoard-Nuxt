import getJobPostsByCompanyId from '~/server/handlers/company/jobPosts/getJobPostsByCompanyId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler returns job posts by company id from the database.
  if (method === 'GET') {
    try {
      return await getJobPostsByCompanyId(event);
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
