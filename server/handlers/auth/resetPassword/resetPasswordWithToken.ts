import { H3Event, EventHandlerRequest } from 'h3';
import isSignedIn from '../isSignedIn';
import { usersCollection } from '~/server/lib/db/mongodb/collections';
import resetPasswordSchema from '../../../../models/auth/validators/resetPassword.schema';
import hashPassword from '~/server/lib/passwordManagement/hashPassword';
import isTokenExpired from '~/server/lib/tokenManagement/isTokenExpired';

// This handler finds a user by password reset token and changes the password.

export default async function resetPasswordWithToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check if user is signed in.
  await isSignedIn(event);

  // STEP 2: Find the user with the token from params.
  const { passwordResetToken } = event.context.params as {
    passwordResetToken: string;
  };

  const user = await usersCollection.findOne({
    passwordResetToken,
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find a user with that reset token.',
    });
  }

  // STEP 3: Check token has not expired.
  const checkTokenExpired = await isTokenExpired(
    user.passwordResetTokenExpiryTime,
  );

  if (checkTokenExpired) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Your password reset token has expired. Please request for a new one.',
    });
  }

  // STEP 4: Validate the request body.
  const body = await readBody(event);

  const validation = await resetPasswordSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 5: Hash the password from the validated data.
  const { password } = validation.data;

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to hash the password. Please try again',
    });
  }

  // STEP 6: Update the user.
  const updatedUser = await usersCollection.findOneAndUpdate(
    {
      passwordResetToken,
    },
    {
      $set: {
        updatedAt: new Date(),
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiryTime: null,
      },
    },
  );

  if (!updatedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to reset password. Please try again.',
    });
  }

  // STEP 7: Send success message.
  return 'Succesfully reset password.';
}
