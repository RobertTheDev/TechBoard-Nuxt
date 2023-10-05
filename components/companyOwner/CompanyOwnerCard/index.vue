<template>
  <div>
    <p>{{ companyOwner._id }}</p>
    <p>{{ companyOwner.company.name }}</p>
  </div>
</template>

<script setup lang="ts">
import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

const companyOwner = defineProps<ICompanyOwner>();
</script>
