import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import isAuthenticated from '../auth/isAuthenticated';
import isTokenUnexpired from '~/server/lib/tokenManagement/isTokenUnexpired';
import generateToken from '~/server/lib/tokenManagement/generateToken';
import getSessionUser from '../auth/getSessionUser';

// This handler validates the request body, updates the user and sends the email verifcation email to user.

export default async function sendEmailVerificationToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get the user's data.
  const { _id } = await getSessionUser(event);

  const user = await usersCollection.findOne({
    _id: new ObjectId(_id),
  });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User was not found.',
    });
  }

  // STEP 4: Check user email address is not already verified.
  if (user.emailVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: `Your email address has already been verified.`,
    });
  }

  // STEP 5: Check user has no valid token and create the password reset token with expiry using generate token handler.
  const checkTokenExpired = await isTokenUnexpired(
    user.emailVerificationTokenExpiryTime,
  );

  if (checkTokenExpired) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Your email verification token has not expired.',
    });
  }
  const { token, tokenExpiryTime } = await generateToken();

  const emailVerificationTokenExpiryTime = tokenExpiryTime;

  const emailVerificationToken = token;

  // STEP 6: Send the email verification email.

  // STEP 7: Add token and expiry to the user in the db.
  const updatedUser = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
    },
    {
      $set: {
        updatedAt: new Date(),
        emailVerificationToken,
        emailVerificationTokenExpiryTime,
      },
    },
  );

  if (!updatedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to update user with verification token. Please try again.`,
    });
  }

  // STEP 8: Return success message.

  return 'Succesfully sent email verification email.';
}
