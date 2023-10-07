<template>
  <NuxtLayout name="company-admin">
    <div>
      <p>Admin</p>
      <div class="flex flex-col">
        <NuxtLink
          v-for="companyAdminLink in companyAdminLinks"
          :to="companyAdminLink.path"
        >
          {{ companyAdminLink.name }}
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import companyAdminLinks from '~/lib/links/companyAdminLinks';
</script>
