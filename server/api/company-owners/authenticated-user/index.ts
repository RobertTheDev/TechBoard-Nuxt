import getCompaniesByAuthenticatedUser from '~/server/handlers/companyOwner/getCompaniesByAuthenticatedUser';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets the companies owned by the authenticated user.
  if (method === 'GET') {
    try {
      return await getCompaniesByAuthenticatedUser(event);
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
