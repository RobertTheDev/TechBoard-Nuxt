<template>
  <NuxtLink :to="`/companies/${company._id}`">
    <p>{{ company.name }}</p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import ICompany from '~/models/company/interfaces/Company';

const company = defineProps<ICompany>();
</script>
