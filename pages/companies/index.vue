<template>
  <div>
    <h1>Companies</h1>

    <div v-if="companies">
      <CompanyCard
        v-for="company in companies"
        :key="company._id"
        v-bind="company"
      />
    </div>

    <div v-if="!companies">
      <p>No companies were found.</p>
    </div>

    <div v-if="pending">
      <p>Loading...</p>
    </div>

    <div v-if="error">
      <button @click="refresh()">Retry</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ICompany from '@/models/company/interfaces/Company';

const {
  data: companies,
  pending,
  error,
  refresh,
} = await useFetch<ICompany[]>('/api/companies');
</script>
