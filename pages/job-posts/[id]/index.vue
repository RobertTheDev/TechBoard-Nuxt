<template>
  <div>
    <div v-if="jobPost">
      <p>{{ jobPost.title }}</p>
    </div>

    <div v-if="!jobPost">
      <p>No job post was found.</p>
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

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Post | ${companyName}`,
  ogTitle: `Job Post | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
