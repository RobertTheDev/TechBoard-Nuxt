import deleteCompanyById from '~/server/handlers/company/deleteCompanyById';
import getCompanyById from '~/server/handlers/company/getCompanyById';
import updateCompanyById from '~/server/handlers/company/updateCompanyById';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets a company by its unique id from the database.
  if (method === 'GET') {
    try {
      return await getCompanyById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler deletes a company by its unique id from the database.
  if (method === 'DELETE') {
    try {
      return await deleteCompanyById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler updates a company by its unique id from the database.
  if (method === 'PUT') {
    try {
      return await updateCompanyById(event);
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
