export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data } = await useFetch(`/api/auth/session`);

  if (!data.value && to.path !== '/') {
    return navigateTo('/');
  }
});
