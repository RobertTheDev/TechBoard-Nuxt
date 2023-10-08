import { ObjectId } from 'mongodb';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job offer from the db by finding its unique id.

export default async function deleteJobOfferById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  return jobOffersCollection.deleteOne({
    _id: new ObjectId(id),
  });
}
