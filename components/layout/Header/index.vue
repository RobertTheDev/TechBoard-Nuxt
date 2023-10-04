<template>
  <header class="bg-white">
    <NuxtLink to="/">{{ companyName }}</NuxtLink>
    <NuxtLink to="/job-posts/create">Create Job Post</NuxtLink>
    <p v-if="user">{{ user.emailAddress }}</p>
    <button v-if="user" @click="handleSignOut">Sign Out</button>
    <button v-if="!user">Sign In</button>
    <NuxtLink to="/auth/sign-in">Sign In</NuxtLink>
  </header>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';

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
