import { ObjectId } from 'mongodb';
import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job application from the db by finding its unique id.

export default async function deleteJobApplicationById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return jobApplicationsCollection.deleteOne({
    _id: new ObjectId(id),
  });
}
