import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes company owners from the db using their matching company id.

export default async function deleteCompanyOwnersByCompanyId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: companyId } = event.context.params as { id: string };

  const deletedCompanyOwners = await companyOwnersCollection.deleteMany({
    companyId: new ObjectId(companyId),
  });

  if (!deletedCompanyOwners) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not delete the company owners. Please try again.',
    });
  }

  return {
    statusMessage: 'The company owners were successfully deleted.',
  };
}
