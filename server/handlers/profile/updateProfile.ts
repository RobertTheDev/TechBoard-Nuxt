import { H3Event, EventHandlerRequest } from 'h3';
import getSessionUser from '../auth/helpers/getSessionUser';
import { usersCollection } from '~/server/lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import isAuthenticated from '../auth/isAuthenticated';
import getProfile from './getProfile';
import updateProfileSchema from '~/models/profile/validators/updateProfileSchema';

// This handler uses the session to update the users collection in the db.

export default async function updateProfile(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check if user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get user from session.
  const { _id } = await getSessionUser(event);

  // STEP 3: Validate the request body.
  const body = await readBody(event);

  const validation = await updateProfileSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 4: Update the user profile data in the db.

  const updateProfile = await usersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    {
      $set: {
        updatedAt: new Date(),
        ...validation.data,
      },
    },
  );

  if (!updateProfile) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to update your profile. Please try again.',
    });
  }

  // STEP 5: Get the updated profile data.
  const updatedProfile = await getProfile(event);

  // STEP 6: Return the user profile data from db.
  return updatedProfile;
}
