import { ObjectId } from 'mongodb';
import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';
import { H3Event, EventHandlerRequest } from 'h3';

// This handler deletes company owners from the db using their matching user id.

export default async function deleteCompanyOwnersByUserId(
  event: H3Event<EventHandlerRequest>,
) {
  const { userId } = event.context.params as { userId: string };

  const deletedCompanyOwners = await jobPostsCollection.deleteMany({
    userId: new ObjectId(userId),
  });

  if (!deletedCompanyOwners) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not delete the company owners. Please try again.',
    });
  }

  return {
    statusMessage: 'The company owners were successfully deleted.',
  };
}
