import { H3Event, EventHandlerRequest } from 'h3';
import {
  companiesCollection,
  companyOwnersCollection,
} from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import isAuthenticated from '../auth/isAuthenticated';
import getSessionUser from '../auth/helpers/getSessionUser';

// This handler validates the request body and creates a new job post.

export default async function isCompanyOwner(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Check user is authenticated.
  await isAuthenticated(event);

  const { _id: userId } = await getSessionUser(event);

  // STEP 2: Get the company ID from request params and check company exists.
  const { id: companyId } = event.context.params as { id: string };

  const company = await companiesCollection.findOne({
    _id: new ObjectId(companyId),
  });

  if (!company) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company with that id exists.',
    });
  }

  const companyOwner = await companyOwnersCollection.findOne({
    userId: new ObjectId(userId),
    companyId: new ObjectId(companyId),
  });

  if (!companyOwner) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are not an owner of this company.',
    });
  }
}
