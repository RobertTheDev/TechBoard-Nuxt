<template>
  <div>
    <h1>Forgot Password?</h1>
    <ForgotPasswordForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Forgot Password | ${companyName}`,
  ogTitle: `Forgot Password | ${companyName}`,
  description: `If you have forgotten your password to your ${companyName} account - enter your email address below and we will send you an email with a link to get back in.`,
  ogDescription: `If you have forgotten your password to your ${companyName} account - enter your email address below and we will send you an email with a link to get back in.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
