import { ObjectId } from 'mongodb';
import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler finds and returns a job post by its unique id from the db.

export default async function getJobPostById(
  event: H3Event<EventHandlerRequest>,
) {
  const { id } = event.context.params as { id: string };

  const jobPost = await jobPostsCollection.findOne({
    _id: new ObjectId(id),
  });

  if (!jobPost) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No job post was found with that id.',
    });
  }

  return jobPost;
}
