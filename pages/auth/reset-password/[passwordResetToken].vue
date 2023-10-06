<template>
  <div>
    <h1>Reset Password</h1>
    <ResetPasswordForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Reset Password | ${companyName}`,
  ogTitle: `Reset Password | ${companyName}`,
  description: `Complete the form to reset your ${companyName} password. Your password must be at least eight characters long containing a letter, number and special character.`,
  ogDescription: `Complete the form to reset your ${companyName} password. Your password must be at least eight characters long containing a letter, number and special character.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
