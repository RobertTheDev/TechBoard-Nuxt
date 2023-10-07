import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';

// This handler finds and returns all the job posts by matching company id from the db.

export default async function getJobPostsByCompanyId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return await jobPostsCollection
    .find({
      companyId: new ObjectId(id),
    })
    .toArray();
}
