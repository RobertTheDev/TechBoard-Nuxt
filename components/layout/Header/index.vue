<template>
  <header class="bg-white">
    <p>{{ companyName }}</p>
    <NuxtLink to="/job-posts/create">Create Job Post</NuxtLink>
  </header>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
</script>
