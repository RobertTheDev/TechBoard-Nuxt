import deleteCompanyOwnersByCompanyId from '~/server/handlers/company/companyOwners/deleteCompanyOwnersByCompanyId';
import getCompanyOwnersByCompanyId from '~/server/handlers/company/companyOwners/getCompanyOwnersByCompanyId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets company owners by their matching company id from the database.
  if (method === 'GET') {
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
  }

  // This handler deletes company owners by their matching company id from the database.
  if (method === 'DELETE') {
    try {
      return await deleteCompanyOwnersByCompanyId(event);
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
