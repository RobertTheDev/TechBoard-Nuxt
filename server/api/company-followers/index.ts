import getCompaniesFollowed from '~/server/handlers/companyFollower/getCompaniesFollowed';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler gets the companies the user follows.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  if (method === 'GET') {
    try {
      return await getCompaniesFollowed(event);
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
