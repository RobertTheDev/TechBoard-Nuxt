<template>
  <div>
    <h1>Edit Profile</h1>
    <EditProfileForm />
  </div>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Edit Profile | ${companyName}`,
  ogTitle: `Edit Profile | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
