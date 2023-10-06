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
</script>
