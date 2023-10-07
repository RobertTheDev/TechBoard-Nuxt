<template>
  <NuxtLayout name="company-admin">
    <div>
      <h1>Create Job Post</h1>
      <CreateJobPostForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Create Job Post | ${companyName}`,
  ogTitle: `Create Job Post | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
