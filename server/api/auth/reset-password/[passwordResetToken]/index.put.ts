import resetPasswordWithToken from '~/server/handlers/auth/resetPasswordWithToken';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler resets a user's password using the password reset token.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await resetPasswordWithToken(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
