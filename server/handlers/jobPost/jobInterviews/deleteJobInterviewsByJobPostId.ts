import { ObjectId } from 'mongodb';
import { jobInterviewsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job interviews from the db using their matching job post id.

export default async function deleteJobInterviewsByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobInterviewsCollection.deleteMany({
    jobPostId: new ObjectId(jobPostId),
  });
}
