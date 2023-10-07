<template>
  <div class="flex flex-col">
    <NuxtLink
      v-for="companyAdminLink in companyAdminLinks"
      :key="companyAdminLink.path"
      :to="`/companies/${companyId}/admin/${companyAdminLink.path}`"
    >
      {{ companyAdminLink.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import companyAdminLinks from '~/lib/links/companyAdminLinks';

const { id: companyId } = useRoute().params;
</script>
