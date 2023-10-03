import { ObjectId } from 'mongodb';
import { companiesCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes a company from the db using its unique id.

export default async function deleteCompanyById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  const deletedCompany = await companiesCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deletedCompany) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not delete the company. Please try again.',
    });
  }

  return {
    statusMessage: 'The company was successfully deleted.',
  };
}
