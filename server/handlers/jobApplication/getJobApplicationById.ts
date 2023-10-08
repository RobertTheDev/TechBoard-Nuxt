import { ObjectId } from 'mongodb';
import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job application from the db by finding its unique id.

export default async function getJobApplicationsByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return jobApplicationsCollection
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
