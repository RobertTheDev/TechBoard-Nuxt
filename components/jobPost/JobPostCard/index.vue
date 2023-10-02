<template>
  <NuxtLink :to="`/job-posts/${jobPost._id}`">
    <p>{{ jobPost.title }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const jobPost = defineProps<{ _id: string; title: string }>();
</script>
