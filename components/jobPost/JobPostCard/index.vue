<template>
  <NuxtLink :to="`/job-posts/${jobPost._id}`">
    <p>{{ jobPost.title }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import IJobPost from '~/models/jobPost/interfaces/JobPost';

const jobPost = defineProps<IJobPost>();
</script>
