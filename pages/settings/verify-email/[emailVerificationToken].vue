<template>
  <NuxtLayout name="settings">
    <h1>Verify Email</h1>
    <VerifyEmailForm />
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: ` | ${companyName}`,
  ogTitle: ` | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
