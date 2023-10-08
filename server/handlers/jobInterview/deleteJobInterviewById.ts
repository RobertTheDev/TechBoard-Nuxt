import { ObjectId } from 'mongodb';
import { jobInterviewsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job interview from the db by finding its unique id.

export default async function deleteJobInterviewById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return jobInterviewsCollection.deleteOne({
    _id: new ObjectId(id),
  });
}
