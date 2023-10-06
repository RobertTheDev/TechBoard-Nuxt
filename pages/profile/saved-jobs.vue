<template>
  <div>
    <h1>Saved Jobs</h1>

    <div v-if="savedJobPosts">
      <JobOfferCard
        v-for="savedJobPost in savedJobPosts"
        :key="savedJobPost._id"
        v-bind="savedJobPost"
      />
    </div>

    <div v-if="!savedJobPosts">
      <p>No saved jobs were found.</p>
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
import ISavedJobPost from '~/models/savedJobPost/interfaces/SavedJobPost';

const {
  data: savedJobPosts,
  pending,
  error,
  refresh,
} = await useFetch<ISavedJobPost[]>('/api/');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Saved Jobs | ${companyName}`,
  ogTitle: `Saved Jobs | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
