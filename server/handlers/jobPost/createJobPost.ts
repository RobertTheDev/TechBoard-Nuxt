import { H3Event, EventHandlerRequest } from 'h3';
import createJobPostSchema from '~/models/jobPost/validators/createJobPost.schema';
import { jobPostsCollection } from '../../lib/db/mongodb/collections';
import { ObjectId } from 'mongodb';

// This handler validates the request body and creates a new job post.

export default async function createJobPost(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Validate the request body.
  const body = await readBody(event);

  const validation = await createJobPostSchema.safeParseAsync(body);

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error.errors[0].message,
    });
  }

  // STEP 2: Create a new job post in the database.
  const createdJobPost = await jobPostsCollection.insertOne({
    createdAt: new Date(),
    ...validation.data,
  });

  if (!createdJobPost) {
    throw createError({
      statusCode: 400,
      statusMessage:
        'There was an error trying to create the job post. Please try again.',
    });
  }

  // STEP 3: Find and return the created job post from the database.
  const jobPost = await jobPostsCollection.findOne({
    _id: new ObjectId(createdJobPost.insertedId),
  });

  if (!jobPost) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job post was found with the provided id.',
    });
  }

  return jobPost;
}
