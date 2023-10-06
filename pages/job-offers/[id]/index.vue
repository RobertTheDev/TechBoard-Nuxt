<template>
  <div>
    <h1>Job Offer</h1>

    <div v-if="jobOffer">
      <p>{{ jobOffer._id }}</p>
    </div>

    <div v-if="!jobOffer">
      <p>No job offer was found.</p>
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
import IJobOffer from '@/models/jobOffer/interfaces/JobOffer';

const {
  data: jobOffer,
  pending,
  error,
  refresh,
} = await useFetch<IJobOffer | null>('/api/job-offers/:id');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Offer | ${companyName}`,
  ogTitle: `Job Offer | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
