import { ObjectId } from "mongodb";
import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";
import { H3Event, EventHandlerRequest } from "h3";

// This handler deletes a job post from the db using its unique id.

export default async function deleteJobPostById(
  event: H3Event<EventHandlerRequest>
) {
  const { id } = event.context.params as { id: string };

  const deletedJobPost = await jobPostsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  if (!deletedJobPost) {
    throw createError({
      statusCode: 400,
      statusMessage: "Could not delete the job post. Please try again.",
    });
  }

  return {
    statusMessage: "The job post was successfully deleted.",
  };
}
