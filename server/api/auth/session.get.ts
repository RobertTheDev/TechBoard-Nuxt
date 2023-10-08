import getSessionUser from '~/server/handlers/auth/helpers/getSessionUser';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler gets the user from session.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await getSessionUser(event);
  } catch (error) {
    // If an error occurs then log the error and return an unsuccessful statement.
    const errorMessage = (error as Error).message;
    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );
    return error;
  }
});
