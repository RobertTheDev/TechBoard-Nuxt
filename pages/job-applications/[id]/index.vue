<template>
  <div>
    <h1>Job Application</h1>

    <div v-if="jobApplication">
      <p>{{ jobApplication.message }}</p>
    </div>

    <div v-if="!jobApplication">
      <p>No job application was found.</p>
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
import IJobApplication from '@/models/jobApplication/interfaces/JobApplication';

const {
  data: jobApplication,
  pending,
  error,
  refresh,
} = await useFetch<IJobApplication | null>('/api/job-applications/:id');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Application | ${companyName}`,
  ogTitle: `Job Application | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
