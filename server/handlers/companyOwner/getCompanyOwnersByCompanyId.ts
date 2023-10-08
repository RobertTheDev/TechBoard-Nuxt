import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets company owners from the db using their matching company id.

export default async function getCompanyOwnersByCompanyId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: companyId } = event.context.params as { id: string };

  return companyOwnersCollection
    .aggregate(
      [
        {
          $match: {
            companyId: new ObjectId(companyId),
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
          $unwind: {
            path: '$user',
          },
        },
        { $project: { 'user.password': 0 } },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    )
    .toArray();
}
