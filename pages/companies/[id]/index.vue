<template>
  <div>
    <h1>Company</h1>

    <div v-if="company">
      <p>{{ company.name }}</p>
    </div>

    <div v-if="!company">
      <p>No company was found.</p>
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

const { id } = useRoute().params;

const {
  data: company,
  pending,
  error,
  refresh,
} = await useFetch<ICompany | null>(`/api/companies/${id}`);

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `${company.value ? company.value.name : 'Company'} | ${companyName}`,
  ogTitle: `${company.value ? company.value.name : 'Company'} | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
