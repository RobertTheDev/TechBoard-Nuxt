import { useSession } from '~/server/lib/session';

export default eventHandler(async (event) => {
  const session = await useSession(event);
  session.user = {
    name: 'User ' + Math.round(Math.random() * 1000),
  };
  await session.save();
  return 'OK';
});
