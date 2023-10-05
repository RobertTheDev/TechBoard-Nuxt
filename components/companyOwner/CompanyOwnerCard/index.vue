<template>
  <div>
    <p>{{ companyOwner._id }}</p>
    <p>{{ companyOwner.company.name }}</p>
    <button @click="navigateToCompanyEditPage(companyOwner.companyId)">
      Edit Company
    </button>
    <button @click="navigateToCompanyPage(companyOwner.companyId)">
      View Company
    </button>
  </div>
</template>

<script setup lang="ts">
import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

const companyOwner = defineProps<ICompanyOwner>();

const router = useRouter();

function navigateToCompanyPage(id: string) {
  router.push(`/companies/${id}`);
}

function navigateToCompanyEditPage(id: string) {
  router.push(`/companies/${id}/edit-company`);
}
</script>
