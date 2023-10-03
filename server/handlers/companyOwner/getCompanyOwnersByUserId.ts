import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets company owners from the db using their matching user id.

export default async function getCompanyOwnersByUserId(
  event: H3Event<EventHandlerRequest>,
) {
  const { userId } = event.context.params as { userId: string };

  return companyOwnersCollection.find({
    userId: new ObjectId(userId),
  });
}
