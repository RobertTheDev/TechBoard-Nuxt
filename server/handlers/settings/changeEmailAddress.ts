import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import changeEmailSchema from '~/models/settings/validators/changeEmailSchema';

// This handler validates the request body and changes the user's email address.

export default async function changeEmailAddress(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await changeEmailSchema.safeParseAsync(body);

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

  // STEP 3: Check password entered is correct.
  const { password } = validation.data;

  const checkPassword = await verifyPassword(password, user.password);

  if (!checkPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is incorrect.',
    });
  }

  // STEP 4: Change the user email address.
  const changedEmailAddress = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
    },
    {
      $set: {
        updatedAt: new Date(),
        emailAddress: validation.data.emailAddress,
      },
    },
  );

  if (!changedEmailAddress) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to change your email address. Please try again.`,
    });
  }

  // STEP 5: Return success message.

  return 'Succesfully changed your email address.';
}
