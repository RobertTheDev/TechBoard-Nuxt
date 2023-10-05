import createCompany from '~/server/handlers/company/createCompany';
import getCompanies from '~/server/handlers/company/getCompanies';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  if (method === 'GET') {
    try {
      return await getCompanies();
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
  if (method === 'POST') {
    try {
      return await createCompany(event);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
});
