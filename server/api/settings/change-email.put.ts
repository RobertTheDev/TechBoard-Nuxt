import changeEmailAddress from '~/server/handlers/settings/changeEmailAddress';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler changes the email address.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await changeEmailAddress(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
