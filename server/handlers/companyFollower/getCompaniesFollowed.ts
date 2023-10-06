import { H3Event, EventHandlerRequest } from 'h3';
import { companyFollowersCollection } from '../../lib/db/mongodb/collections';
import isAuthenticated from '../auth/isAuthenticated';
import getSessionUser from '../auth/getSessionUser';

// This handler returns the companies the user follows.

export default async function getCompaniesFollowed(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check if user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get user id from session.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Return the companies.
  return await companyFollowersCollection
    .find({
      userId,
    })
    .toArray();
}
