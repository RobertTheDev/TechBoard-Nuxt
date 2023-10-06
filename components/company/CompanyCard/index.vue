<template>
  <div>
    <p>{{ company.category }}</p>
    <p>{{ company.createdAt }}</p>
    <p>{{ company.description }}</p>
    <p>{{ company.name }}</p>
    <p>{{ company.totalEmployees }}</p>

    <div v-if="company.coverImage">
      <img :src="company.coverImage.url" :alt="company.coverImage.alt" />
    </div>

    <div v-if="company.logo">
      <img :src="company.logo.url" :alt="company.logo.alt" />
    </div>

    <button @click="navigateToCompany(company._id)">View Company</button>

    <button @click="followCompany(company._id)">
      {{ followPending ? 'Loading...' : 'Follow' }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import ICompany from '~/models/company/interfaces/Company';

const company = defineProps<ICompany>();

const router = useRouter();

function navigateToCompany(companyId: string) {
  router.push(`/companies/${companyId}`);
}

const followPending = ref(false);

async function followCompany(companyId: string) {
  const { pending, error, data } = await useFetch(
    `/api/company/${companyId}/follow`,
    {
      method: 'POST',
    },
  );

  if (pending) {
    followPending.value = true;
  }

  if (data || error) {
    followPending.value = false;
  }
}
</script>
