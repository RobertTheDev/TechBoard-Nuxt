import { getIronSession } from 'iron-session';
import { H3Event, EventHandlerRequest } from 'h3';

export async function useSession(event: H3Event<EventHandlerRequest>) {
  if (event.context.session) {
    return event.context.session;
  }
  const session = await getIronSession(event.req, event.res, {
    cookieName: String(process.env.IRON_SESSION_COOKIE_NAME),
    password: String(process.env.IRON_SESSION_PASSWORD),
  });
  event.context.session = session;
  return session;
}
