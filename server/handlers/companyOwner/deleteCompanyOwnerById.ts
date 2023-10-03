import { ObjectId } from 'mongodb';
import { companyOwnersCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes a company owner from the db using its unique id.

export default async function deleteCompanyOwnerById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  const deletedCompanyOwner = await companyOwnersCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deletedCompanyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not delete the company owner. Please try again.',
    });
  }

  return {
    statusMessage: 'The company owner was successfully deleted.',
  };
}
