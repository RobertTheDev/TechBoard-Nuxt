import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import sendPasswordResetSchema from '~/models/auth/validators/sendPasswordReset.schema';
import { randomUUID } from 'node:crypto';
import getUserByEmailAddress from '../user/getUserByEmailAddress';

// This handler validates the request body and sends a password reset token.

export default async function sendPasswordResetToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await sendPasswordResetSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  const { emailAddress } = validation.data;

  // STEP 2: Find the user by their email address.
  const signedInUser = await usersCollection.findOne({
    emailAddress,
  });

  if (!signedInUser) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user with email ${emailAddress} was found in our records.`,
    });
  }

  // Check user exists with the requested email address.
  const user = await getUserByEmailAddress(emailAddress);

  // If no user exists return a 404.
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: `Account with email ${emailAddress} does not exist. Please sign up or try again with a different email address.`,
    });
  }

  // Create an expiry time 10 minutes from now.
  const currentTimeInMS = new Date().getTime();

  const resetPasswordTokenExpiryTime = new Date(
    currentTimeInMS + 10 * 60 * 1000,
  ).getTime();

  // Create a reset password token using a generated random uuid.
  const resetPasswordToken = randomUUID();

  // Update the user with the reset password token to retrieve it.
  await usersCollection.findOneAndUpdate(
    {
      emailAddress,
    },
    {
      $set: {
        resetPasswordToken,
        resetPasswordTokenExpiryTime,
      },
    },
  );

  // STEP 5: Return success message.
  return {
    statusCode: 200,
    statusMessage: `Password reset email has been succesfully sent to ${emailAddress}. Please check spam or deleted folder if email does not appear in your inbox.`,
  };
}
