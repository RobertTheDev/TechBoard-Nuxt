<template>
  <div>
    <div v-if="jobPosts">
      <p v-for="jobPost in jobPosts" :key="jobPost.id">{{ jobPost.title }}</p>
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
import JobPost from "@/models/jobPost/interfaces/JobPost";

const {
  data: jobPosts,
  pending,
  error,
  refresh,
} = await useFetch<JobPost[]>("/api/job-posts");
</script>
