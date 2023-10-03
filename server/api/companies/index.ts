import createCompany from '~/server/handlers/company/createCompany';
import getCompanies from '~/server/handlers/company/getCompanies';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets all companies from the database.
  if (method === 'GET') {
    try {
      // Find and return all the companies from the db.
      return await getCompanies();
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }
  // This handler validates the body and of successful creates a new company in the database.
  if (method === 'POST') {
    try {
      return await createCompany(event);
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
