import deleteJobPostById from '~/server/handlers/jobPost/deleteJobPostById';
import getJobPostById from '~/server/handlers/jobPost/getJobPostById';
import updateJobPostById from '~/server/handlers/jobPost/updateJobPostById';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  const { id } = event.context.params as { id: string };

  // This handler gets a job post by its unique id from the database.
  if (method === 'GET') {
    try {
      return await getJobPostById(id);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler deletes a job post by its unique id from the database.
  if (method === 'DELETE') {
    try {
      return await deleteJobPostById(id);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }

  // This handler updates a job post by its unique id from the database.
  if (method === 'PUT') {
    try {
      const body = await readBody(event);

      return await updateJobPostById(id, body);
    } catch (error) {
      // If an error occurs then log the error and return an unsuccessful statement.
      const errorMessage = (error as Error).message;
      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );
      return error;
    }
  }
});
