import getFollowedCompaniesByProfile from '~/server/handlers/profile/followedCompanies/getFollowedCompaniesByProfile';
import winstonLogger from '~/server/lib/logger/winston/winstonLogger';

export default defineEventHandler(async (event) => {
  const { method, originalUrl } = event.node.req;

  if (method === 'GET') {
    try {
      return await getFollowedCompaniesByProfile(event);
    } catch (error) {
      const errorMessage = (error as Error).message;

      winstonLogger.error(
        `Error in route ${method} ${originalUrl}: ${errorMessage}`,
      );

      return error;
    }
  }
});
