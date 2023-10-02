<template>
  <div>
    <div v-if="jobPost">
      <p>{{ jobPost.title }}</p>
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
import JobPost from '@/models/jobPost/interfaces/JobPost';

const { id } = useRoute().params;

const {
  data: jobPost,
  pending,
  error,
  refresh,
} = await useFetch<JobPost | null>(`/api/job-posts/${id}`);
</script>
