import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';
import updateJobOfferSchema from '~/models/jobOffer/validators/updateJobOffer.schema';
import { jobOffersCollection } from '~/server/lib/db/mongodb/collections';

// This handler validates the request body and updates a job offer by its unique id.

export default async function updateJobOfferById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const { id } = event.context.params as { id: string };

  const validation = await updateJobOfferSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Update the job offer by its id with the validated data.
  const updatedJobOffer = await jobOffersCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: validation.data },
  );

  if (!updatedJobOffer) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job offer was found with the provided id.',
    });
  }

  // STEP 3: Find and return the job offer by its unique id.
  const jobOffer = await jobOffersCollection.findOne({
    _id: new ObjectId(updatedJobOffer._id),
  });

  return jobOffer;
}
