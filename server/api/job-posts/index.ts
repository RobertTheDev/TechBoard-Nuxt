import getJobPosts from "~/server/handlers/jobPost/getJobPosts";

export default defineEventHandler(async (event) => {
  const { method } = event.node.req;

  // This handler gets all job posts from the database.
  if (method === "GET") {
    try {
      const jobPosts = await getJobPosts(event);

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
