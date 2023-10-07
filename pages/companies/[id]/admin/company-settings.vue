<template>
  <NuxtLayout name="company-admin">
    <div>
      <h1>Update Company</h1>
      <UpdateCompanyForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Company Settings | ${companyName}`,
  ogTitle: `Company Settings | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
