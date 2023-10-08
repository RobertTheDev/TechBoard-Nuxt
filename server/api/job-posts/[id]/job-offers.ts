import getJobOffersByJobPostId from '~/server/handlers/jobOffer/getJobOffersByJobPostId';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  // This handler gets job offers by their matching jon post id from the database.
  if (method === 'GET') {
    try {
      return await getJobOffersByJobPostId(event);
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
