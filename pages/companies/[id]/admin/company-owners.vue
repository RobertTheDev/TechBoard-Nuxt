<template>
  <div>
    <h1>Company Owners</h1>

    <div v-if="companyOwners">
      <CompanyOwnerCard
        v-for="companyOwner in companyOwners"
        :key="companyOwner._id"
        v-bind="companyOwner"
      />
    </div>

    <div v-if="!companyOwners">
      <p>No company owners were found.</p>
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
import ICompanyOwner from '@/models/companyOwner/interfaces/CompanyOwner';

const {
  data: companyOwners,
  pending,
  error,
  refresh,
} = await useFetch<ICompanyOwner[]>('/api/');
</script>
