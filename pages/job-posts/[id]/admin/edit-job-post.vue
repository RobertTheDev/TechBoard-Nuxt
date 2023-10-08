<template>
  <NuxtLayout name="job-post-admin">
    <div>
      <h1>Update Job Post</h1>
      <UpdateJobPostForm />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Update Job Post | ${companyName}`,
  ogTitle: `Update Job Post | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
