<template>
  <div>
    <div v-if="jobPosts">
      <JobPostCard
        v-for="jobPost in jobPosts"
        :key="jobPost._id"
        v-bind="jobPost"
      />
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
import IJobPost from '@/models/jobPost/interfaces/JobPost';

const {
  data: jobPosts,
  pending,
  error,
  refresh,
} = await useFetch<IJobPost[]>('/api/job-posts');
</script>
