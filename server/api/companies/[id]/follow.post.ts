import followCompany from '~/server/handlers/companyFollower/followCompany';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler follows and unfollows a company.

  try {
    return await followCompany(event);
  } catch (error) {
    // If an error occurs then log the error and return an unsuccessful statement.
    const errorMessage = (error as Error).message;
    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );
    return error;
  }
});
