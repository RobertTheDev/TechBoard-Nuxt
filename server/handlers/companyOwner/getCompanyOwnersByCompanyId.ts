import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets company owners from the db using their matching company id.

export default async function getCompanyOwnersByCompanyId(
  event: H3Event<EventHandlerRequest>,
) {
  const { companyId } = event.context.params as { companyId: string };

  return companyOwnersCollection.find({
    companyId: new ObjectId(companyId),
  });
}
