import sendEmailVerificationToken from '~/server/handlers/settings/verifyEmailAddress/sendEmailVerificationToken';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

// This handler sends an email verification token to user's email address.

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  try {
    return await sendEmailVerificationToken(event);
  } catch (error) {
    const errorMessage = (error as Error).message;

    winstonLogger.error(
      `Error in route ${method} ${originalUrl}: ${errorMessage}`,
    );

    return error;
  }
});
