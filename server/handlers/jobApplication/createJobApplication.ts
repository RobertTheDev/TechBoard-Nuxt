import { H3Event, EventHandlerRequest } from 'h3';
import { jobApplicationsCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';
import createJobApplicationSchema from '~/models/jobApplication/validators/createJobApplication.schema';

// This handler validates the request body and creates a new job application.

export default async function createJobApplicaation(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createJobApplicationSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new job application in the database.
  const createdJobApplication = await jobApplicationsCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdJobApplication) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the job application. Please try again.',
    });
  }

  // STEP 3: Find and return the created job application from the database.
  const jobApplication = await jobApplicationsCollection.findOne({
    _id: new ObjectId(createdJobApplication.insertedId),
  });

  if (!jobApplication) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job application was found with the provided id.',
    });
  }

  return jobApplication;
}
