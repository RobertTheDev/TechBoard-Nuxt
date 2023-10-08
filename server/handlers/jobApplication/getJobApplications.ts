import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';

// This handler gets job applications from the db.

export default async function getJobApplications() {
  return jobApplicationsCollection
    .aggregate(
      [
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
