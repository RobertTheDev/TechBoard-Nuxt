import { ObjectId } from 'mongodb';
import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets job applications from the db using their matching job post id.

export default async function getJobApplicationsByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobApplicationsCollection
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
