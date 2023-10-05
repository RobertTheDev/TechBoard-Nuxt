import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';
import isAuthenticated from './isAuthenticated';

// This handler signs out a user and destroys the session.

export default async function signOut(event: H3Event<EventHandlerRequest>) {
  // STEP 1: Check is user is in session.
  await isAuthenticated(event);

  // Step 2: Destroy the session.
  const session = await useSession(event);

  await session.destroy();

  // Step 3: Return success message.
  return 'User successfully signed out.';
}
