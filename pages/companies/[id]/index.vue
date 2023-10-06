<template>
  <div>
    <h1>Company</h1>

    <div v-if="company">
      <p>{{ company.name }}</p>
    </div>

    <div v-if="!company">
      <p>No company was found.</p>
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
  data: company,
  pending,
  error,
  refresh,
} = await useFetch<ICompany | null>('/api/companies/:id');
</script>
