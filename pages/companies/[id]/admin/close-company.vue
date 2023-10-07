<template>
  <NuxtLayout name="company-admin">
    <div>
      <h1>Close Company</h1>
      <CloseCompanyForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Close Company | ${companyName}`,
  ogTitle: `Close Company | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
