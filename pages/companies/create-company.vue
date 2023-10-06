<template>
  <div>
    <h1>Create Company</h1>
    <CreateCompanyForm />
  </div>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Create Company | ${companyName}`,
  ogTitle: `Create Company | ${companyName}`,
  description: `Ready to find candidates for your tech companies? Create your company on ${companyName} today! Our platform makes it easy to find candidates for your company, find top talent, and share your job posts with the world.`,
  ogDescription: `Ready to find candidates for your tech companies? Create your company on ${companyName} today! Our platform makes it easy to find candidates for your company, find top talent, and share your job posts with the world.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
