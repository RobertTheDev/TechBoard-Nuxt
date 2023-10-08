import { H3Event, EventHandlerRequest } from 'h3';
import getSessionUser from '../auth/helpers/getSessionUser';
import { usersCollection } from '~/server/lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import isAuthenticated from '../auth/isAuthenticated';

// This handler uses the session to query the users collection in the db.

export default async function getProfile(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Check if user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get user from session.
  const { _id } = await getSessionUser(event);

  // STEP 3: Get the user profile data from db.
  const profile = await usersCollection.findOne({ _id: new ObjectId(_id) });

  if (!profile) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No user was found in our records.',
    });
  }

  // STEP 4: Remove password.
  const { password, ...profileData } = profile;

  // STEP 4: Return the user profile data from db.
  return profileData;
}
