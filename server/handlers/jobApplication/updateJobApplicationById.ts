import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';
import updateJobApplicationSchema from '~/models/jobApplication/validators/updateJobApplication.schema';
import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';

// This handler validates the request body and updates a job application by its unique id.

export default async function updateJobApplicationById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const { id } = event.context.params as { id: string };

  const validation = await updateJobApplicationSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Update the job application by its id with the validated data.
  const updatedJobApplication =
    await jobApplicationsCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: validation.data },
    );

  if (!updatedJobApplication) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job application was found with the provided id.',
    });
  }

  // STEP 3: Find and return the job application by its unique id.
  const jobApplication = await jobApplicationsCollection.findOne({
    _id: new ObjectId(updatedJobApplication._id),
  });

  return jobApplication;
}
