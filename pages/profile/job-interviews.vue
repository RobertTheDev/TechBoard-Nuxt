<template>
  <div>
    <h1>Job Interviews</h1>

    <div v-if="jobInterviews">
      <JobInterviewCard
        v-for="jobInterview in jobInterviews"
        :key="jobInterview._id"
        v-bind="jobInterview"
      />
    </div>

    <div v-if="!jobInterviews || jobInterviews.length <= 0">
      <p>No job interviews were found.</p>
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
import IJobInterview from '~/models/jobInterview/interfaces/JobInterview';

const {
  data: jobInterviews,
  pending,
  error,
  refresh,
} = await useFetch<IJobInterview[]>('/api/profile/job-interviews');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Interviews | ${companyName}`,
  ogTitle: `Job Interviews | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
