import { ObjectId } from 'mongodb';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job offer from the db by finding its unique id.

export default async function getJobOfferById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return jobOffersCollection
    .aggregate(
      [
        {
          $match: {
            _id: new ObjectId(id),
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
        {
          $unwind: {
            path: '$jobPost',
          },
        },
      ],
      { maxTimeMS: 60000, allowDiskUse: true },
    )
    .toArray();
}
