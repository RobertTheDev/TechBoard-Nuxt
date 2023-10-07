import { ObjectId } from 'mongodb';
import { companiesCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';
import isAuthenticated from '../auth/isAuthenticated';
import isCompanyOwner from '../companyOwner/isCompanyOwner';
import deleteCompanyOwnersByCompanyId from '../companyOwner/deleteCompanyOwnersByCompanyId';
import closeCompanySchema from '~/models/company/validators/closeCompany.schema';

// This handler deletes a company from the db using its unique id.

export default async function deleteCompanyById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Is user authenticated.
  await isAuthenticated(event);

  // STEP 2: Is user company owner.
  await isCompanyOwner(event);

  // STEP 3: Validate the request body.
  const body = await readBody(event);

  const validation = await closeCompanySchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 4: Delete the company.
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

  // STEP 5: Delete the company owners.
  await deleteCompanyOwnersByCompanyId(event);

  // STEP 6: Return success message.

  return {
    statusMessage: 'The company was successfully deleted.',
  };
}
