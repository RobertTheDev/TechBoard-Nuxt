import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler gets a company owner from the db using its unique id.

export default async function getCompanyOwnerById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  const companyOwner = await companyOwnersCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!companyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not get the company owner. Please try again.',
    });
  }

  return companyOwner;
}
