<template>
  <div
    @click="navigateToCompany(company._id)"
    class="bg-white flex flex-col items-center p-6 rounded-md overflow-hidden hover:cursor-pointer"
  >
    <div class="h-20 w-20 overflow-hidden rounded-full">
      <img
        v-if="company.logoUrl"
        :src="company.logoUrl"
        alt="Company logo"
        class="h-full w-full object-cover"
      />
    </div>
    <p>{{ company._id }}</p>
    <p>{{ company.name }}</p>
    <p>{{ company.createdAt }}</p>
    <p>{{ company.category }}</p>
    <p>{{ company.totalEmployees }}</p>

    <button
      @click.stop="() => followCompany(company._id)"
      class="bg-purple-500 h-auto flex w-2/3 items-center justify-center p-3 rounded-md"
    >
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
    `/api/companies/${companyId}/follow`,
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
