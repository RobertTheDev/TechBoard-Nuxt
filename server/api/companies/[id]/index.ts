import deleteCompanyOwnerById from '~/server/handlers/companyOwner/deleteCompanyOwnerById';
import getCompanyOwnerById from '~/server/handlers/companyOwner/getCompanyOwnerById';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets a company owner by its unique id from the database.
  if (method === 'GET') {
    try {
      return await getCompanyOwnerById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler deletes a company owner by its unique id from the database.
  if (method === 'DELETE') {
    try {
      return await deleteCompanyOwnerById(event);
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
