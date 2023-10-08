import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';
import updateJobInterviewSchema from '~/models/jobInterview/validators/updateJobInterview.schema';
import { jobInterviewsCollection } from '~/server/lib/db/mongodb/collections';

// This handler validates the request body and updates a job interview by its unique id.

export default async function updateJobInterviewById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const { id } = event.context.params as { id: string };

  const validation = await updateJobInterviewSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Update the job interview by its id with the validated data.
  const updatedJobInterview = await jobInterviewsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: validation.data },
  );

  if (!updatedJobInterview) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job interview was found with the provided id.',
    });
  }

  // STEP 3: Find and return the job interview by its unique id.
  const jobInterview = await jobInterviewsCollection.findOne({
    _id: new ObjectId(updatedJobInterview._id),
  });

  return jobInterview;
}
