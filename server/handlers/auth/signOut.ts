import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';

// This handler signs out a user and destroys the session.

export default async function signOut(event: H3Event<EventHandlerRequest>) {
  const session = await useSession(event);

  await session.destroy();

  return 'User successfully signed out.';
}
