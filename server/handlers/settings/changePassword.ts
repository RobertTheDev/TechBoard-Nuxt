import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import changePasswordSchema from '~/models/settings/validators/changePasswordSchema';

// This handler validates the request body and changes the user's password.

export default async function changePassword(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await changePasswordSchema.safeParseAsync(body);

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

  // STEP 3: Check current password entered is correct.
  const { currentPassword } = validation.data;

  const checkPassword = await verifyPassword(currentPassword, user.password);

  if (!checkPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is incorrect.',
    });
  }

  // STEP 4: Change the user password.
  const changedPassword = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
    },
    {
      $set: {
        updatedAt: new Date(),
        password: validation.data.newPassword,
      },
    },
  );

  if (!changedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to reset your password. Please try again.`,
    });
  }

  // STEP 5: Return success message.

  return 'Password succesfully reset.';
}
