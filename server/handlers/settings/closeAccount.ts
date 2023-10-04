import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import closeAccountSchema from '~/models/settings/validators/closeAccountSchema';
import getSessionUser from '../auth/getSessionUser';
import { ObjectId } from 'mongodb';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import signOut from '../auth/signOut';

// This handler validates the request body and sends a password reset token.

export default async function closeAccount(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await closeAccountSchema.safeParseAsync(body);

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

  // STEP 3: Check password is correct.
  const { password } = validation.data;

  const checkPassword = await verifyPassword(password, user.password);

  if (!checkPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is incorrect.',
    });
  }

  // STEP 4: Delete the user.
  const deletedUser = await usersCollection.deleteOne({
    _id: new ObjectId(_id),
  });

  if (!deletedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to close your account. Please try again.`,
    });
  }

  // STEP 5: Sign the user out.

  await signOut(event);

  // STEP 6: Return success message.

  return 'Succesfully closed your account.';
}
