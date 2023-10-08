import sendPasswordResetToken from '~/server/handlers/auth/resetPassword/sendPasswordResetToken';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler sends a password reset token to user's email.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await sendPasswordResetToken(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
