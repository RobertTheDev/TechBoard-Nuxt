import { H3Event, EventHandlerRequest } from 'h3';
import {
  companiesCollection,
  companyOwnersCollection,
} from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createCompanySchema from '~/models/company/validators/createCompany.schema';
import isAuthenticated from '../auth/helpers/isAuthenticated';
import getSessionUser from '../auth/helpers/getSessionUser';

// This handler validates the request body and creates a new company.

export default async function createCompany(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  // STEP 2: Get user id from session.
  const { _id: userId } = await getSessionUser(event);

  // STEP 3: Validate the request body.
  const body = await readBody(event);

  const validation = await createCompanySchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 4: Create a new company in the database.
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

  // STEP 5: Create company owner.
  const companyOwner = await companyOwnersCollection.insertOne({
    createdAt: new Date(),
    companyId: new ObjectId(createdCompany.insertedId),
    userId: new ObjectId(userId),
  });

  if (!companyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Failed to create company owner.',
    });
  }

  // STEP 6: Find and return the created company from the database.
  const company = await companiesCollection.findOne({
    _id: new ObjectId(createdCompany.insertedId),
  });

  if (!company) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company was found with the provided id.',
    });
  }

  // STEP 7: Return the created company.
  return company;
}
