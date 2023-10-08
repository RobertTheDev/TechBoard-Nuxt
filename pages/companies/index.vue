<template>
  <div>
    <h1>Companies</h1>

    <div v-if="companies" class="grid grid-cols-4 p-4">
      <CompanyCard
        v-for="company in companies"
        :key="company._id"
        v-bind="company"
      />
    </div>

    <div v-if="!companies">
      <p>No companies were found.</p>
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
import ICompany from '@/models/company/interfaces/Company';

const {
  data: companies,
  pending,
  error,
  refresh,
} = await useFetch<ICompany[]>('/api/companies');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Find Companies | ${companyName}`,
  ogTitle: `Find Companies | ${companyName}`,
  description: `Discover top tech companies to work for today on ${companyName}.  Discover top career opportunities in the industry today and elevate your path to a successful career in tech.`,
  ogDescription: `Discover top tech companies to work for today on ${companyName}.  Discover top career opportunities in the industry today and elevate your path to a successful career in tech.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
