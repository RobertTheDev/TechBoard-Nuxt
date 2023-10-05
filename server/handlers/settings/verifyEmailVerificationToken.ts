import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import isAuthenticated from '../auth/isAuthenticated';
import isTokenExpired from '~/server/lib/tokenManagement/isTokenExpired';

// This handler matches user with the email verifcation token and verifies them.

export default async function verifyEmailVerificationToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Find the user with the token from params.
  const { emailVerificationToken } = event.context.params as {
    emailVerificationToken: string;
  };

  const user = await usersCollection.findOne({
    emailVerificationToken,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find a user with that verification token.',
    });
  }

  // STEP 3: Check token has not expired.
  const checkTokenExpired = await isTokenExpired(
    user.emailVerificationTokenExpiryTime,
  );

  if (checkTokenExpired) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Your email verification token has expired. Please request for a new one.',
    });
  }

  // STEP 4: Verify the user email.
  const verifiedUser = await usersCollection.findOneAndUpdate(
    {
      emailVerificationToken,
    },
    {
      $set: {
        updatedAt: new Date(),
        emailVerified: new Date(),
        emailVerificationToken: null,
        emailVerificationTokenExpiryTime: null,
      },
    },
  );

  if (!verifiedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to verify your email address. Please try again.',
    });
  }

  // STEP 7: Send success message.
  return 'Succesfully verified your email address.';
}
