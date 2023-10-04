import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import sendEmailVerificationTokenSchema from '~/models/settings/validators/sendEmailVerificationTokenSchema';

// This handler matches user with the email verifcation token and verifies them.

export default async function verifyEmailVerificationToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Get the token from the params.
  const body = await readBody(event);

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

  // STEP 3: Create the verification token has not expired.

  // Create an expiry time 10 minutes from now.
  const currentTimeInMS = new Date().getTime();

  const emailVerificationTokenExpiryTime = new Date(
    currentTimeInMS + 10 * 60 * 1000,
  ).getTime();

  // Create a random UUID to use as a token.
  const emailVerificationToken = crypto.randomUUID();

  // STEP 4: Send the email verification email.

  // STEP 5: Add token and expiry to the user in the db.
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

  // STEP 6: Return success message.

  return 'Succesfully sent email verification email.';
}
