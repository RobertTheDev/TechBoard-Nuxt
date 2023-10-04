import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import sendEmailVerificationTokenSchema from '~/models/settings/validators/sendEmailVerificationTokenSchema';

// This handler validates the request body, updates the user and sends the email verifcation email to user.

export default async function sendEmailVerificationToken(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation =
    await sendEmailVerificationTokenSchema.safeParseAsync(body);

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

  // STEP 3: Create the verification token with expiry.

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
