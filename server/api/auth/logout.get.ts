import { useSession } from '~/server/lib/session';

export default eventHandler(async (event) => {
  const session = await useSession(event);
  await session.destroy();
  return 'OK';
});
