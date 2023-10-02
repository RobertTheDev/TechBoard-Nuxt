import { jobPostsCollection } from "~/server/lib/db/mongodb/collections";

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  if (method === "GET") {
    try {
      const jobPosts = await jobPostsCollection.find().toArray();

      return {
        success: true,
        data: jobPosts,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
});
