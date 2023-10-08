import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';

// This handler checks the session to see if user is signed in. Throws an error if they are.

export default async function isSignedIn(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Get user from session.
  const session = await useSession(event);

  const { user } = session;

  // STEP 2: If there is a user then throw an error.
  if (user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are aleady signed in.',
    });
  }
}
