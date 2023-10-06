import getCompaniesByProfile from '~/server/handlers/profile/companies/getCompaniesByProfile';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  if (method === 'GET') {
    try {
      return await getCompaniesByProfile(event);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
});
