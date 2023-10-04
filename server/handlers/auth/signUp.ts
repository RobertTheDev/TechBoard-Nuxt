import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import signUpSchema from '~/models/auth/validators/signUp.schema';
import { useSession } from '~/server/lib/session';
import hashPassword from '~/server/lib/passwordManagement/hashPassword';

// This handler validates the request body and signs up a new user and signs them into session.

export default async function signUp(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await signUpSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Check email address is not in use.
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

  // STEP 3: Hash the user's password.
  const { password, ...userDataWithoutPassword } = validation.data;

  const hashedPassword = await hashPassword(password);

  // STEP 4: Creates or signs up a new user in the database.
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

  // STEP 5: Sign the user into session.
  const session = await useSession(event);

  session.user = userDataWithoutPassword;

  await session.save();

  // STEP 6: Return success message.
  return 'Successfully signed up.';
}
