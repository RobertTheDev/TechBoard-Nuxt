<template>
  <div>
    <div v-if="jobPosts">
      <JobPostCard
        v-for="jobPost in jobPosts"
        :key="jobPost._id"
        v-bind="jobPost"
      />
    </div>

    <div v-if="!jobPosts">
      <p>No job posts found.</p>
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
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

const {
  data: jobPosts,
  pending,
  error,
  refresh,
} = await useFetch<IJobPost[]>('/api/job-posts');

useSeoMeta({
  title: `Job Search | ${companyName}`,
  ogTitle: `Job Search | ${companyName}`,
  description: `Welcome to ${companyName} - an online platform for finding tech jobs. Explore a diverse range of remote job opportunities in the tech industry on our cutting-edge platform. ${companyName} is dedicated to connecting talented professionals like you with remote positions in programming, software development, web design, and beyond. Discover the perfect work-from-home job that matches your skills and aspirations. Join our thriving community of remote tech enthusiasts and unlock endless possibilities for growth and success. Embrace the future of work and kickstart your rewarding tech career with ${companyName} today.`,
  ogDescription: `Welcome to ${companyName} - an online platform for finding tech jobs. Explore a diverse range of remote job opportunities in the tech industry on our cutting-edge platform. ${companyName} is dedicated to connecting talented professionals like you with remote positions in programming, software development, web design, and beyond. Discover the perfect work-from-home job that matches your skills and aspirations. Join our thriving community of remote tech enthusiasts and unlock endless possibilities for growth and success. Embrace the future of work and kickstart your rewarding tech career with ${companyName} today.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
