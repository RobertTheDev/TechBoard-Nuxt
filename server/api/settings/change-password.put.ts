import changePassword from '~/server/handlers/settings/changePassword';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler changes a user's password.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await changePassword(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
