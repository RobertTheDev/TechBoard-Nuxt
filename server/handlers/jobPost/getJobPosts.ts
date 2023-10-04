import { jobPostsCollection } from '~/server/lib/db/mongodb/collections';

// This handler finds and returns all the job posts from the db.

export default async function getJobPosts() {
  return await jobPostsCollection.find().toArray();
}
