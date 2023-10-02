<template>
  <div>
    <p v-for="jobPost in jobPosts" :key="jobPost.id">{{ jobPost.title }}</p>
  </div>
</template>

<script setup lang="ts">
import JobPost from "@/models/jobPost/interfaces/JobPost";

const { data: jobPosts } = await useFetch<JobPost[]>("/api/job-posts");
</script>
