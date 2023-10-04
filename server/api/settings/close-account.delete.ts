import closeAccount from '~/server/handlers/settings/closeAccount';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler deletes a user and removes them from session.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await closeAccount(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
