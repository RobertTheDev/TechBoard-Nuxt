<template>
  <footer class="bg-white">
    <p>© {{ currentYear }} {{ companyName }}</p>
  </footer>
</template>

<script setup lang="ts">
import companyName from '~/lib/constants/companyName';
import currentYear from '~/lib/constants/currentYear';
</script>
