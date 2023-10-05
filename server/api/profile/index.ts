import getProfile from '~/server/handlers/profile/getProfile';
import updateProfile from '~/server/handlers/profile/updateProfile';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  if (method === 'GET') {
    try {
      return await getProfile(event);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }

  if (method === 'PUT') {
    try {
      return await updateProfile(event);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
});
