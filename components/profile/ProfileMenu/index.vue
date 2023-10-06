<template>
  <Teleport to="body">
    <div
      class="bg-red-300 flex flex-col gap-8 top-16 absolute right-0 w-auto h-auto p-8"
    >
      <p>Profile Menu</p>
      <NuxtLink
        v-for="profileMenuLink in profileMenuLinks"
        :to="profileMenuLink.path"
        :key="profileMenuLink.path"
        >{{ profileMenuLink.name }}</NuxtLink
      >
      <button @click="handleSignOut">Sign Out</button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import profileMenuLinks from '~/lib/links/profileMenuLinks';

async function handleSignOut() {
  const { pending, error } = await useFetch(`/api/auth/sign-out`);
  if (pending.value) {
    console.log('loading');
  } else if (error.value) {
    console.log(error.value);
  } else {
    window.location.reload();
  }
}
</script>
