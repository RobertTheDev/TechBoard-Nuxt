import deleteCompanyOwnersByUserId from '~/server/handlers/profile/companyOwners/deleteCompanyOwnersByUserId';
import getCompanyOwnersByUserId from '~/server/handlers/profile/companyOwners/getCompanyOwnersByUserId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets companies owned by their matching user id from the database.
  if (method === 'GET') {
    try {
      return await getCompanyOwnersByUserId(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler deletes companies owned by their matching user id from the database.
  if (method === 'DELETE') {
    try {
      return await deleteCompanyOwnersByUserId(event);
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
