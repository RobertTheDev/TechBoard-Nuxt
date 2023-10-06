import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import isAuthenticated from '../../auth/isAuthenticated';
import { H3Event, EventHandlerRequest } from 'h3';
import getSessionUser from '../../auth/getSessionUser';
import { ObjectId } from 'mongodb';

// This handler finds and returns all the companies owned by the signed in user from the db.

export default async function getCompaniesByProfile(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get the user id.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Find companie owners by user id.
  return await companyOwnersCollection
    .aggregate(
      [
        {
          $match: {
            userId: new ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'companies',
            localField: 'companyId',
            foreignField: '_id',
            as: 'company',
          },
        },
        { $unwind: { path: '$company' } },
        { $unwind: { path: '$user' } },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    )
    .toArray();
}
