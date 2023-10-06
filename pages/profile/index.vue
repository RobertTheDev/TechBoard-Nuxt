<template>
  <div>
    <div v-if="profile">
      <p>{{ profile.emailAddress }}</p>
      <p>{{ profile.firstName }} {{ profile.lastName }}</p>
    </div>

    <div v-if="!profile">
      <p>No profile found.</p>
    </div>

    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-if="error">
      <button @click="refresh()">Retry</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IProfile from '~/models/profile/interfaces/Profile';

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useFetch<IProfile>('/api/profile');
</script>
