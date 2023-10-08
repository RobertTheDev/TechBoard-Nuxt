<template>
  <NuxtLayout name="company-admin">
    <div>
      <p>Admin</p>
      <div class="flex flex-col">
        <NuxtLink
          v-for="companyAdminLink in companyAdminLinks"
          :key="companyAdminLink.path"
          :to="`/companies/${companyId}/admin/${companyAdminLink.path}`"
        >
          {{ companyAdminLink.name }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyAdminLinks from '~/lib/links/companyAdminLinks';

const { id: companyId } = useRoute().params;

import companyName from '~/lib/constants/companyName';
import logoImage from '~/lib/constants/logoImage';

useSeoMeta({
  title: `Company | ${companyName}`,
  ogTitle: `Company | ${companyName}`,
  description: ``,
  ogDescription: ``,
  ogImage: logoImage,
  twitterCard: 'summary_large_image',
});
</script>
