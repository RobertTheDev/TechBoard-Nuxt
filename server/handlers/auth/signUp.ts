import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import signUpSchema from '~/models/auth/validators/signUp.schema';
import { useSession } from '~/server/lib/session';
import hashPassword from '~/server/lib/passwordManagement/hashPassword';
import isSignedIn from './isSignedIn';

// This handler validates the request body and signs up a new user and signs them into session.

export default async function signUp(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Check if user is signed in.
  await isSignedIn(event);

  // STEP 2: Validate the request body.
  const body = await readBody(event);

  const validation = await signUpSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 3: Check email address is not in use.
  const { emailAddress } = validation.data;

  const findUserByEmailAddress = await usersCollection.findOne({
    emailAddress,
  });

  if (findUserByEmailAddress) {
    throw createError({
      statusCode: 400,
      statusMessage: `Email address ${emailAddress} is already in use.`,
    });
  }

  // STEP 4: Hash the user's password.
  const { password, ...userDataWithoutPassword } = validation.data;

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to hash the password. Please try again',
    });
  }

  // STEP 5: Creates or signs up a new user in the database.
  const signedUpUser = await usersCollection.insertOne({
    createdAt: new Date(),
    ...userDataWithoutPassword,
    password: hashedPassword,
  });

  if (!signedUpUser) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to sign up the user. Please try again.',
    });
  }

  // STEP 6: Sign the user into session.
  const session = await useSession(event);

  session.user = userDataWithoutPassword;

  await session.save();

  // STEP 7: Return success message.
  return 'Successfully signed up.';
}
