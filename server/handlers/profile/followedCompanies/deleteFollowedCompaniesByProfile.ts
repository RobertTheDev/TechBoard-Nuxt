import { companyFollowersCollection } from '~/server/lib/db/mongodb/collections';
import isAuthenticated from '../../auth/isAuthenticated';
import { H3Event, EventHandlerRequest } from 'h3';
import getSessionUser from '../../auth/helpers/getSessionUser';
import { ObjectId } from 'mongodb';

// This handler finds and deletes all the followed companies by the signed in user from the db.

export default async function deleteFollowedCompaniesByProfile(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get the user id.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Delete company folowers by user id.
  return await companyFollowersCollection.deleteMany({
    userId: new ObjectId(userId),
  });
}
