import { ObjectId } from 'mongodb';
import { jobApplicationsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes job applications from the db using their matching job post id.

export default async function deleteJobApplicationsByJobPostId(
  event: H3Event<EventHandlerRequest>,
) {
  const { id: jobPostId } = event.context.params as { id: string };

  return jobApplicationsCollection.deleteMany({
    jobPostId: new ObjectId(jobPostId),
  });
}
