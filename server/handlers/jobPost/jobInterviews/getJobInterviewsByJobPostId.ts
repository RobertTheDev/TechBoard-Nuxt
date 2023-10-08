import { ObjectId } from 'mongodb';
import { jobInterviewsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job interviews from the db using their matching job post id.

export default async function getJobInterviewsByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobInterviewsCollection
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
