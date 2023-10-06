<template>
  <NuxtLayout name="settings">
    <h1>Change Email</h1>
    <ChangeEmailForm />
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Change Email | ${companyName}`,
  ogTitle: `Change Email | ${companyName}`,
  description: `Change your email on ${companyName} by entering a new email address in the input below and authenticate with your password.`,
  ogDescription: `Change your email on ${companyName} by entering a new email address in the input below and authenticate with your password.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
