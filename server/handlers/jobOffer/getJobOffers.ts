import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';

// This handler gets job offers from the db.

export default async function getJobOffers() {
  return jobOffersCollection
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
