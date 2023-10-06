<template>
  <main>
    <ContentDoc>
      <template #not-found>
        <h1>404 - Not Found</h1>
      </template>
    </ContentDoc>
  </main>
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
