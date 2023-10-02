import { useSession } from '~/server/lib/session';

export default eventHandler(async (event) => {
  const session = await useSession(event);
  return JSON.stringify(session);
});
