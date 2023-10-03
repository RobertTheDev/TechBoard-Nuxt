import createCompanyOwner from '~/server/handlers/companyOwner/createCompanyOwner';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler validates the body and successfully creates a new company owner in the database.
  if (method === 'POST') {
    try {
      return await createCompanyOwner(event);
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
