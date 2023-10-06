<template>
  <NuxtLayout name="settings">
    <h1>Change Email</h1>
    <ChangePasswordForm />
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Change Password | ${companyName}`,
  ogTitle: `Change Password | ${companyName}`,
  description: `To change your password for your account on ${companyName} - enter your new password followed by your current password.`,
  ogDescription: `To change your password for your account on ${companyName} - enter your new password followed by your current password.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
