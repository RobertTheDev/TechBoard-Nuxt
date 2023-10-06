<template>
  <NuxtLayout name="settings">
    <h1>Close Account</h1>
    <CloseAccountForm />
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Close Account | ${companyName}`,
  ogTitle: `Close Account | ${companyName}`,
  description: `To close and delete your account on ${companyName} - and remove all associated data. Enter your password and then type 'DELETE'.`,
  ogDescription: `To close and delete your account on ${companyName} - and remove all associated data. Enter your password and then type 'DELETE'.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
