<template>
  <div>
    <h1>Job Applications</h1>

    <div v-if="jobApplications">
      <JobApplicationCard
        v-for="jobApplication in jobApplications"
        :key="jobApplication._id"
        v-bind="jobApplication"
      />
    </div>

    <div v-if="!jobApplications || jobApplications.length <= 0">
      <p>No job applications were found.</p>
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
  data: jobApplications,
  pending,
  error,
  refresh,
} = await useFetch<IJobApplication[]>('/api/profile/job-applications');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Applications | ${companyName}`,
  ogTitle: `Job Applications | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
