<template>
  <div>
    <div v-if="jobPosts">
      <NuxtLink
        v-for="jobPost in jobPosts"
        :key="jobPost._id"
        :to="`/job-posts/${jobPost._id}`"
      >
        <p>{{ jobPost.title }}</p>
      </NuxtLink>
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
