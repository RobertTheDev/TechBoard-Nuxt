<template>
  <div>
    <h1>Job Offers</h1>

    <div v-if="jobOffers">
      <JobOfferCard
        v-for="jobOffer in jobOffers"
        :key="jobOffer._id"
        v-bind="jobOffer"
      />
    </div>

    <div v-if="!jobOffers">
      <p>No job offers were found.</p>
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
import IJobOffer from '~/models/jobOffer/interfaces/JobOffer';

const {
  data: jobOffers,
  pending,
  error,
  refresh,
} = await useFetch<IJobOffer[]>('/api/');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Offers | ${companyName}`,
  ogTitle: `Job Offers | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
