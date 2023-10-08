import { ObjectId } from 'mongodb';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job offers from the db using their matching job post id.

export default async function deleteJobOffersByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobOffersCollection.deleteMany({
    jobPostId: new ObjectId(jobPostId),
  });
}
