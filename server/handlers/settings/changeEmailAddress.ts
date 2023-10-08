import { H3Event, EventHandlerRequest } from 'h3';
import { usersCollection } from '../../lib/db/mongodb/collections';
import getSessionUser from '../auth/helpers/getSessionUser';
import { ObjectId } from 'mongodb';
import verifyPassword from '~/server/lib/passwordManagement/verifyPassword';
import changeEmailSchema from '~/models/settings/validators/changeEmailSchema';
import isAuthenticated from '../auth/isAuthenticated';

// This handler validates the request body and changes the user's email address.

export default async function changeEmailAddress(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Validate the request body.
  const body = await readBody(event);

  const validation = await changeEmailSchema.safeParseAsync(body);

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

  // STEP 4: Check new email address is different to current email.
  const isNewEmailDifferent =
    validation.data.newEmailAddress !== user.emailAddress;

  if (!isNewEmailDifferent) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'Your new email address cannot be the same as your current one.',
    });
  }

  // STEP 5: Check the user's email is not taken.
  const isEmailTaken = await usersCollection.findOne({
    emailAddress: validation.data.newEmailAddress,
  });

  if (isEmailTaken) {
    throw createError({
      statusCode: 400,
      statusMessage: `${validation.data.newEmailAddress} is already in use.`,
    });
  }

  // STEP 6: Check password entered is correct.
  const { password } = validation.data;

  const checkPassword = await verifyPassword(user.password, password);

  if (!checkPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Password is incorrect.',
    });
  }

  // STEP 7: Change the user email address.
  const changedEmailAddress = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(user._id),
    },
    {
      $set: {
        updatedAt: new Date(),
        emailAddress: validation.data.newEmailAddress,
        emailVerified: null,
      },
    },
  );

  if (!changedEmailAddress) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to change your email address. Please try again.`,
    });
  }

  // STEP 8: Return success message.

  return 'Succesfully changed your email address.';
}
