import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';

// This handler checks the session to see if user has authenticated before performing action.

export default async function isAuthenticated(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Get user from session.
  const session = await useSession(event);

  const { user } = session;

  // STEP 2: Throw error is no user is returned from the session.
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You must be signed in to perform this action.',
    });
  }
}
