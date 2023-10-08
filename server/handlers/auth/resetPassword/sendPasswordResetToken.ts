import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../../lib/db/mongodb/collections';
import sendPasswordResetTokenSchema from '~/models/auth/validators/sendPasswordResetToken.schema';
import isSignedIn from '../helpers/isSignedIn';
import generateToken from '~/server/lib/tokenManagement/generateToken';
import isTokenUnexpired from '~/server/lib/tokenManagement/isTokenUnexpired';

// This handler validates the request body and sends the password reset token to user's email.

export default async function sendPasswordResetToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check if user is signed in.
  await isSignedIn(event);

  // STEP 2: Validate the request body.
  const body = await readBody(event);

  const validation = await sendPasswordResetTokenSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 3: Get the user's data.
  const { emailAddress } = validation.data;

  const user = await usersCollection.findOne({
    emailAddress,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user was found with email ${emailAddress}.`,
    });
  }

  // STEP 4: Check user has no valid token and create the password reset token with expiry using generate token handler.
  const checkTokenExpired = await isTokenUnexpired(
    user.passwordResetTokenExpiryTime,
  );

  if (checkTokenExpired) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Your password reset token has not expired.',
    });
  }

  const { token, tokenExpiryTime } = await generateToken();

  const passwordResetTokenExpiryTime = tokenExpiryTime;

  const passwordResetToken = token;

  // STEP 5: Send the password reset email.

  // STEP 6: Add token and expiry to the user in the db.
  const updatedUser = await usersCollection.findOneAndUpdate(
    {
      emailAddress,
    },
    {
      $set: {
        updatedAt: new Date(),
        passwordResetToken,
        passwordResetTokenExpiryTime,
      },
    },
  );

  if (!updatedUser) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Failed to update user with password reset token. Please try again.',
    });
  }

  // STEP 7: Return success message.

  return 'Succesfully sent password reset email.';
}
