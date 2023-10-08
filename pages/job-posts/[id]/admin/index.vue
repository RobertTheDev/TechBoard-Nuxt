<template>
  <NuxtLayout name="job-post-admin">
    <div>
      <h1>Job Post Admin</h1>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Job Post Admin | ${companyName}`,
  ogTitle: `Job Post Admin | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
