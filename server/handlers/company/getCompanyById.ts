import { ObjectId } from 'mongodb';
import { companiesCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler finds and returns a company by its unique id from the db.

export default async function getCompanyById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  const company = await companiesCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!company) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company was found with that id.',
    });
  }

  return company;
}
