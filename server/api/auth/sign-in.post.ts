import signIn from '~/server/handlers/auth/signIn';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler signs in a user and saves them into session.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await signIn(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
