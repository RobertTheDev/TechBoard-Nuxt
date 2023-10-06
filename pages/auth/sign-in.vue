<template>
  <div class="min-w-full flex flex-col items-center p-8">
    <h1>Sign In</h1>
    <SignInForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Sign In | ${companyName}`,
  ogTitle: `Sign In | ${companyName}`,
  description: `Sign in to ${companyName} today to see your job posts and companies and get quick access to the job posts you have saved and companies you follow.`,
  ogDescription: `Sign in to ${companyName} today to see your job posts and companies and get quick access to the job posts you have saved and companies you follow.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
