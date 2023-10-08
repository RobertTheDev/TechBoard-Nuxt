<template>
  <NuxtLayout name="job-post-admin">
    <div>
      <h1>Close Job Post</h1>
      <CloseJobPostForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Close Job Post | ${companyName}`,
  ogTitle: `Close Job Post | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
