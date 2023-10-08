import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../../lib/db/mongodb/collections';
import closeAccountSchema from '~/models/settings/validators/closeAccountSchema';
import getSessionUser from '../../auth/helpers/getSessionUser';
import { ObjectId } from 'mongodb';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import signOut from '../../auth/signOut';
import isAuthenticated from '../../auth/helpers/isAuthenticated';

// This handler validates the request body and sends a password reset token.

export default async function closeAccount(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Validate the request body.
  const body = await readBody(event);

  const validation = await closeAccountSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 3: Get the user's data.
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

  // STEP 4: Check password is correct.
  const { password } = validation.data;

  const checkPassword = await verifyPassword(user.password, password);

  if (!checkPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is incorrect.',
    });
  }

  // STEP 5: Delete the user.
  const deletedUser = await usersCollection.deleteOne({
    _id: new ObjectId(_id),
  });

  if (!deletedUser) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to close your account. Please try again.`,
    });
  }

  // STEP 6: Sign the user out.

  await signOut(event);

  // STEP 7: Return success message.

  return 'Succesfully closed your account.';
}
