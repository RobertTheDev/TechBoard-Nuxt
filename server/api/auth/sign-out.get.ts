import signOut from '~/server/handlers/auth/signOut';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler signs out a user and destroys the session.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await signOut(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
