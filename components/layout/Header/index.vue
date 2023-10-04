<template>
  <header class="bg-white h-16 min-w-full flex items-center p-4 shadow-lg">
    <div class="flex flex-1 justify-start items-center">
      <NuxtLink to="/">{{ companyName }}</NuxtLink>
    </div>
    <div class="flex flex-1 justify-end items-center">
      <NuxtLink to="/job-posts/create">Create Job Post</NuxtLink>
      <p v-if="user">{{ user.emailAddress }}</p>
      <button v-if="user" @click="handleSignOut">Sign Out</button>
      <button v-if="!user">Sign In</button>
      <NuxtLink to="/auth/sign-in">Sign In</NuxtLink>
    </div>
    <button @click="handleToggleProfileMenu">Profile</button>

    <div
      v-if="profileMenuActive"
      class="bg-red-300 top-16 absolute right-0 w-auto h-auto p-8"
    >
      <p>Profile Menu</p>
    </div>
  </header>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';

const profileMenuActive = ref(false);

function handleToggleProfileMenu() {
  profileMenuActive.value = !profileMenuActive.value;
}

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

const {
  data: user,
  pending,
  error,
  refresh,
} = await useFetch<{ id: string; emailAddress: string }>('/api/auth/session');
</script>
