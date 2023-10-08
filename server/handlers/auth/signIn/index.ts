import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../../lib/db/mongodb/collections';
import { useSession } from '~/server/lib/session';
import signInSchema from '~/models/auth/validators/signIn.schema';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import isSignedIn from '../isSignedIn';

// This handler validates the request body and finds a user with their email address and signs them into session.

export default async function signIn(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Check if user is signed in.
  await isSignedIn(event);

  // STEP 2: Validate and get data from the request body.
  const body = await readBody(event);

  const validation = await signInSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // Get the important data from validation.
  const { emailAddress, password } = validation.data;

  // STEP 3: Find the user by their email address.
  const signedInUser = await usersCollection.findOne({
    emailAddress,
  });

  if (!signedInUser) {
    throw createError({
      statusCode: 400,
      statusMessage: `No user found with email ${emailAddress}.`,
    });
  }

  // STEP 4: Verify the user's password.
  const verifyUser = await verifyPassword(signedInUser.password, password);

  if (!verifyUser) {
    throw createError({
      statusCode: 400,
      statusMessage: 'The password entered is incorrect.',
    });
  }

  // STEP 5: Remove password field from signed in user and sign rest of data into session.
  const { password: _, ...userDataWithoutPassword } = signedInUser;

  const session = await useSession(event);

  session.user = userDataWithoutPassword;

  await session.save();

  // STEP 6: Return success message.
  return 'Successfully signed in.';
}
