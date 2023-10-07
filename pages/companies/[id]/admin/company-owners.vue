<template>
  <NuxtLayout name="company-admin">
    <div>
      <h1>Company Owners</h1>

      <div v-if="companyOwners">
        <CompanyOwnerCard
          v-for="companyOwner in companyOwners"
          :key="companyOwner._id"
          v-bind="companyOwner"
        />
      </div>

      <div v-if="!companyOwners">
        <p>No company owners were found.</p>
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
import ICompanyOwner from '@/models/companyOwner/interfaces/CompanyOwner';

const {
  data: companyOwners,
  pending,
  error,
  refresh,
} = await useFetch<ICompanyOwner[]>('/api/');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Company Owners | ${companyName}`,
  ogTitle: `Company Owners | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
