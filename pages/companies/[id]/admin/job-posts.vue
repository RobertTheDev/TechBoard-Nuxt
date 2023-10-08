<template>
  <NuxtLayout name="company-admin">
    <div>
      <div v-if="jobPosts">
        <CompanyJobPostCard
          v-for="jobPost in jobPosts"
          :key="jobPost._id"
          v-bind="jobPost"
        />
      </div>

      <div v-if="!jobPosts || jobPosts.length < 1">
        <p>No job posts found.</p>
      </div>

      <div v-if="pending">
        <p>Loading...</p>
      </div>
      <div v-if="error">
        <button @click="refresh()">Retry</button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import IJobPost from '@/models/jobPost/interfaces/JobPost';

const { id: companyId } = useRoute().params;

const {
  data: jobPosts,
  pending,
  error,
  refresh,
} = await useFetch<IJobPost[]>(`/api/companies/${companyId}/job-posts`);

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Posts | ${companyName}`,
  ogTitle: `Job Posts | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
