<template>
  <div>
    <p>{{ companyOwner._id }}</p>
    <p>{{ companyOwner.company.name }}</p>
    <button @click="navigateToCompanyAdminPage(companyOwner.companyId)">
      Go To Company Admin
    </button>
  </div>
</template>

<script setup lang="ts">
import ICompanyOwner from '~/models/companyOwner/interfaces/CompanyOwner';

const companyOwner = defineProps<ICompanyOwner>();

const router = useRouter();

function navigateToCompanyAdminPage(id: string) {
  router.push(`/companies/${id}/admin`);
}
</script>
