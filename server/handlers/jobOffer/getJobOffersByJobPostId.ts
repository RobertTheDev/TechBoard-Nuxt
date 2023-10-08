import { ObjectId } from 'mongodb';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job offers from the db using their matching job post id.

export default async function getJobOffersByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobOffersCollection
    .aggregate(
      [
        {
          $match: {
            jobPostId: new ObjectId(jobPostId),
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
