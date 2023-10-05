<template>
  <div>
    <h1>My Companies</h1>
    <button>Create Company</button>
    <CreateCompanyForm />
    <div v-if="!companies">
      <p>You have no companies yet.</p>
    </div>
    <div v-if="companies">
      <div v-for="company in companies">
        <p>{{ company._id }}</p>
        <p>{{ company.company.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

const {
  data: companies,
  pending,
  error,
  refresh,
} = await useFetch<ICompanyOwner[]>('/api/company-owners/authenticated-user');
</script>
