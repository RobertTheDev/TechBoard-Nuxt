import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';
import updateCompanySchema from '~/models/company/validators/updateCompany.schema';
import { companiesCollection } from '~/server/lib/db/mongodb/collections';

// This handler validates the request body and updates a company by its unique id.

export default async function updateCompanyById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const { id } = event.context.params as { id: string };

  const validation = await updateCompanySchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Update the company by its id with the validated data.
  const updatedCompany = await companiesCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: validation.data },
  );

  if (!updatedCompany) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No company was found with the provided id.',
    });
  }

  // STEP 3: Find and return the company by its unique id.
  const company = await companiesCollection.findOne({
    _id: new ObjectId(updatedCompany._id),
  });

  return company;
}
