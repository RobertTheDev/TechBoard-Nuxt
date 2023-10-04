import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import sendPasswordResetTokenSchema from '~/models/auth/validators/sendPasswordResetToken.schema';

// This handler validates the request body and sends the password reset token to user's email.

export default async function sendPasswordResetToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await sendPasswordResetTokenSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

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

  // STEP 3: Create the password reset token with expiry.

  // Create an expiry time 10 minutes from now.
  const currentTimeInMS = new Date().getTime();

  const passwordResetTokenExpiryTime = new Date(
    currentTimeInMS + 10 * 60 * 1000,
  ).getTime();

  // Create a random UUID to use as a token.
  const passwordResetToken = crypto.randomUUID();

  // STEP 4: Send the password reset email.

  // STEP 5: Add token and expiry to the user in the db.
  const updatedUser = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
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
      statusMessage: `Failed to update user with password reset token. Please try again.`,
    });
  }

  // STEP 6: Return success message.

  return 'Succesfully sent password reset email.';
}
