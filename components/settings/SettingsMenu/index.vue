<template>
  <div>
    <NuxtLink
      v-for="settingsLink in settingsLinks"
      :to="settingsLink.path"
      :key="settingsLink.path"
    >
      {{ settingsLink.name }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import settingsLinks from '~/lib/links/settingsLinks';
</script>
