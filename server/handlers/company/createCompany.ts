import { H3Event, EventHandlerRequest } from 'h3';
import { companiesCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createCompanySchema from '~/models/company/validators/createCompany.schema';

// This handler validates the request body and creates a new company.

export default async function createCompany(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createCompanySchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new company in the database.
  const createdCompany = await companiesCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdCompany) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the company. Please try again.',
    });
  }

  // STEP 3: Find and return the created company from the database.
  const company = await companiesCollection.findOne({
    _id: new ObjectId(createdCompany.insertedId),
  });

  if (!company) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company was found with the provided id.',
    });
  }

  return company;
}
