import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';

// This handler finds and deletes all the job posts by matching company id from the db.

export default async function deleteJobPostsByCompanyId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: companyId } = event.context.params as { id: string };

  return await jobPostsCollection
    .find({
      companyId: new ObjectId(companyId),
    })
    .toArray();
}
