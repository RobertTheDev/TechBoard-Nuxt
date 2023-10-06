<template>
  <div>
    <h1>Company Admin Menu</h1>
    <NuxtLink
      v-for="companyAdminLink in companyAdminLinks"
      :key="companyAdminLink.path"
      :to="companyAdminLink.path"
    >
      {{ companyAdminLink.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import companyAdminLinks from '~/lib/links/companyAdminLinks';
</script>
