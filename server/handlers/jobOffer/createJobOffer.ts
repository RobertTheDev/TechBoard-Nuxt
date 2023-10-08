import { H3Event, EventHandlerRequest } from 'h3';
import { jobOffersCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createJobOfferSchema from '~/models/jobOffer/validators/createJobOffer.schema';

// This handler validates the request body and creates a new job offer.

export default async function createJobOffer(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createJobOfferSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new job offer in the database.
  const createdJobOffer = await jobOffersCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdJobOffer) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the job offer. Please try again.',
    });
  }

  // STEP 3: Find and return the created job offer from the database.
  const jobOffer = await jobOffersCollection.findOne({
    _id: new ObjectId(createdJobOffer.insertedId),
  });

  if (!jobOffer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job offer was found with the provided id.',
    });
  }

  return jobOffer;
}
