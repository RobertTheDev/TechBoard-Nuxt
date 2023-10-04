import { H3Event, EventHandlerRequest } from 'h3';
import { useSession } from '~/server/lib/session';

// This handler gets the user from session.

export default async function getSessionUser(
  event: H3Event<EventHandlerRequest>,
) {
  const session = await useSession(event);

  const { user } = session;

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'You are not signed in.',
    });
  }

  return user;
}
