import { H3Event, EventHandlerRequest } from 'h3';
import {
  jobInterviewsCollection,
  jobOffersCollection,
} from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createJobInterviewSchema from '~/models/jobInterview/validators/createJobInterview.schema';

// This handler validates the request body and creates a new job interview.

export default async function createJobInterview(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createJobInterviewSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new job interview in the database.
  const createdJobInterview = await jobInterviewsCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdJobInterview) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the job interview. Please try again.',
    });
  }

  // STEP 3: Find and return the created job interview from the database.
  const jobInterview = await jobOffersCollection.findOne({
    _id: new ObjectId(createdJobInterview.insertedId),
  });

  if (!jobInterview) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job interview was found with the provided id.',
    });
  }

  return jobInterview;
}
