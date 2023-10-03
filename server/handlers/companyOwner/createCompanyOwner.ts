import { H3Event, EventHandlerRequest } from 'h3';
import { companyOwnersCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createCompanyOwnerSchema from '~/models/companyOwner/validators/createCompanyOwner.schema';

// This handler validates the request body and creates a new company owner.

export default async function createCompanyOwner(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createCompanyOwnerSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new company owner in the database.
  const createdCompanyOwner = await companyOwnersCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdCompanyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the company owner. Please try again.',
    });
  }

  // STEP 3: Find and return the created company owner from the database.
  const companyOwner = await companyOwnersCollection.findOne({
    _id: new ObjectId(createdCompanyOwner.insertedId),
  });

  if (!companyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company owner was found with the provided id.',
    });
  }

  return companyOwner;
}
