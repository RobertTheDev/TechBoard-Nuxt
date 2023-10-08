import { H3Event, EventHandlerRequest } from 'h3';
import { companyFollowersCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import isAuthenticated from '../auth/helpers/isAuthenticated';
import getSessionUser from '../auth/helpers/getSessionUser';

// This handler follows or unfollows a company by creating or deleting a company follower.

export default async function followCompany(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check if user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get user id from session.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Get the company id from params.
  const { companyId } = event.context.params as { companyId: string };

  // STEP 4: Check user if user is a company follower.
  const companyFollower = await companyFollowersCollection.findOne({
    companyId,
    userId,
  });

  // STEP 5: If user is not company follower then created company follower (FOLLOW).
  if (!companyFollower) {
    const createdCompanyFollower = await companyFollowersCollection.insertOne({
      companyId: new ObjectId(companyId),
      userId: new ObjectId(userId),
    });

    if (!createdCompanyFollower) {
      throw createError({
        statusCode: 400,
        statusMessage:
          'There was an error trying to create the company follower. Please try again.',
      });
    }

    return createdCompanyFollower;
  }

  // STEP 5: If user is a company follower then delete company follower (UNFOLLOW).
  const deletedCompanyFollower = await companyFollowersCollection.deleteOne({
    _id: new ObjectId(companyFollower._id),
  });

  if (!deletedCompanyFollower) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to delete the company follower. Please try again.',
    });
  }

  return 'Succesfully deleted company follower.';
}
