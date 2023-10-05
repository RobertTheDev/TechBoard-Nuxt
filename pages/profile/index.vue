<template>
  <div>
    <div v-if="profile">
      <p>{{ profile.emailAddress }}</p>
      <p>{{ profile.firstName }} {{ profile.lastName }}</p>
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
