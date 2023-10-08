import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import isAuthenticated from '../../auth/helpers/isAuthenticated';
import { H3Event, EventHandlerRequest } from 'h3';
import getSessionUser from '../../auth/helpers/getSessionUser';
import { ObjectId } from 'mongodb';

// This handler finds and returns all the jobs offered to the signed in user from the db.

export default async function getJobOffersByProfile(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get the user id.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Find job offers by user id.
  return await jobOffersCollection
    .aggregate(
      [
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: 'jobPosts',
            localField: 'jobPostId',
            foreignField: '_id',
            as: 'jobPost',
          },
        },
        { $unwind: { path: '$jobPost' } },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    )
    .toArray();
}
