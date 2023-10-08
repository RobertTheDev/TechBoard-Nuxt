import getCompanyOwnersByCompanyId from '~/server/handlers/companyOwner/getCompanyOwnersByCompanyId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets company owners by their matching company id from the database.

  try {
    return await getCompanyOwnersByCompanyId(event);
  } catch (error) {
    // If an error occurs then log the error and return an unsuccessful statement.
    const errorMessage = (error as Error).message;
    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );
    return error;
  }
});
