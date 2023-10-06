<template>
  <div>
    <h1>My Companies</h1>
    <button>Create Company</button>
    <CreateCompanyForm />

    <div v-if="!companies">
      <p>You have no companies yet.</p>
    </div>

    <div v-if="companies">
      <CompanyOwnerCard
        v-for="company in companies"
        :key="company._id"
        v-bind="company"
      />
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
import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

const {
  data: companies,
  pending,
  error,
  refresh,
} = await useFetch<ICompanyOwner[]>('/api/company-owners/authenticated-user');

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `My Companies | ${companyName}`,
  ogTitle: `My Companies | ${companyName}`,
  description: `Explore the companies you've created on TechBoard. Create new companies and manage existing ones seamlessly. Optimize your hiring process and attract top talent for your job openings.`,
  ogDescription: `Explore the companies you've created on TechBoard. Create new companies and manage existing ones seamlessly. Optimize your hiring process and attract top talent for your job openings.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
