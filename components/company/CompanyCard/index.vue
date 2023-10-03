<template>
  <NuxtLink :to="`/companies/${company._id}`">
    <p>{{ company.name }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
const company = defineProps<{ _id: string; name: string }>();
</script>
