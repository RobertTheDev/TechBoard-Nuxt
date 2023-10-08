import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';
import isAuthenticated from '../auth/helpers/isAuthenticated';
import getSessionUser from '../auth/helpers/getSessionUser';

// This handler gets companues by the authenticated user.

export default async function getCompaniesByAuthenticatedUser(
  event: H3Event<EventHandlerRequest>,
) {
  await isAuthenticated(event);

  const { _id } = await getSessionUser(event);

  return await companyOwnersCollection
    .aggregate(
      [
        {
          $match: {
            userId: new ObjectId(_id),
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
