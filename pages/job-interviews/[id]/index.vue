<template>
  <div>
    <h1>Job Interview</h1>

    <div v-if="jobInterview">
      <p>{{ jobInterview._id }}</p>
    </div>

    <div v-if="!jobInterview">
      <p>No job interview was found.</p>
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
import IJobInterview from '@/models/jobInterview/interfaces/JobInterview';

const {
  data: jobInterview,
  pending,
  error,
  refresh,
} = await useFetch<IJobInterview | null>('/api/job-interviews/:id');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Interview | ${companyName}`,
  ogTitle: `Job Interview | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
