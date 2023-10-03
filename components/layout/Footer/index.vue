<template>
  <footer class="bg-white">
    <p>© {{ currentYear }} {{ companyName }}</p>
    <NuxtLink
      v-for="footerLink in footerLinks"
      :to="footerLink.path"
      :key="footerLink.path"
    >
      {{ footerLink.name }}
    </NuxtLink>
  </footer>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import currentYear from '~/lib/constants/currentYear';
import footerLinks from '~/lib/links/footerLinks';
</script>
