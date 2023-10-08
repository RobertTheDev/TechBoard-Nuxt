import { ObjectId } from 'mongodb';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job interviews from the db using their matching user id.

export default async function getJobInterviewsByUserId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: userId } = event.context.params as { id: string };

  return jobOffersCollection
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
