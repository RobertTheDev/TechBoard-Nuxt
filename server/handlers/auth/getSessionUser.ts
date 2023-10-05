import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';

// This handler gets the user from session.

export default async function getSessionUser(
  event: H3Event<EventHandlerRequest>,
) {
  // STEP 1: Get user from the session.
  const session = await useSession(event);

  const { user } = session;

  // STEP 2: If no user is returned throw an error.
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are not signed in.',
    });
  }

  // Return the user.
  return user;
}
