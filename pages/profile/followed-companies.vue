<template>
  <div>
    <h1>Followed Companies</h1>

    <div v-if="followedCompanies">
      <CompanyCard
        v-for="followedCompany in followedCompanies"
        :key="followedCompany._id"
        v-bind="followedCompany.company!"
      />
    </div>

    <div v-if="!followedCompanies || followedCompanies.length <= 0">
      <p>No followed companies were found.</p>
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
import ICompanyFollower from '~/models/companyFollower/interfaces/CompanyFollower';

const {
  data: followedCompanies,
  pending,
  error,
  refresh,
} = await useFetch<ICompanyFollower[]>('/api/profile/company-followers');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Followed Companies | ${companyName}`,
  ogTitle: `Followed Companies | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
