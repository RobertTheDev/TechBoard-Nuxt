import { H3Event, EventHandlerRequest } from 'h3';
import { ObjectId } from 'mongodb';
import updateJobPostSchema from '~/models/jobPost/validators/updateJobPost.schema';
import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';

// This handler validates the request body and updates a job post by its unique id.

export default async function updateJobPostById(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const { id } = event.context.params as { id: string };

  const validation = await updateJobPostSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Update the job post by its id with the validated data.
  const updatedJobPost = await jobPostsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: validation.data },
  );

  if (!updatedJobPost) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job post was found with the provided id.',
    });
  }

  // STEP 3: Find and return the job post by its unique id.
  const jobPost = await jobPostsCollection.findOne({
    _id: new ObjectId(updatedJobPost._id),
  });

  return jobPost;
}
