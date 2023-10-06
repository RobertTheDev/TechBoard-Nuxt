<template>
  <NuxtLayout name="settings">
    <h1>Send Email Verfication</h1>
    <SendEmailVerficationForm />
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Verify Email | ${companyName}`,
  ogTitle: `Verify Email | ${companyName}`,
  description: `Verify your email address on ${companyName} by clicking the verify email button and we will send an email to your account's email address with the verification steps.`,
  ogDescription: `Verify your email address on ${companyName} by clicking the verify email button and we will send an email to your account's email address with the verification steps.`,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
