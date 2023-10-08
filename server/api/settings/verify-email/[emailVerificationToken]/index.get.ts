import verifyEmailVerificationToken from '~/server/handlers/settings/verifyEmailAddress/verifyEmailVerificationToken';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler verfies an email verification token.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await verifyEmailVerificationToken(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
