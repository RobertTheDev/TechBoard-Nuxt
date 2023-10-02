import deleteJobPostById from "~/server/handlers/jobPost/deleteJobPostById";
import getJobPostById from "~/server/handlers/jobPost/getJobPostById";
import updateJobPostById from "~/server/handlers/jobPost/updateJobPostById";
import winstonLogger from "~/server/lib/logger/winston/winstonLogger";

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets a job post by its unique id from the database.
  if (method === "GET") {
    try {
      return await getJobPostById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }

  // This handler deletes a job post by its unique id from the database.
  if (method === "DELETE") {
    try {
      return await deleteJobPostById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }

  // This handler updates a job post by its unique id from the database.
  if (method === "PUT") {
    try {
      return await updateJobPostById(event);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`
      );
      return error;
    }
  }
});
