<template>
  <div class="flex flex-col">
    <NuxtLink
      v-for="jobPostAdminLink in jobPostAdminLinks"
      :key="jobPostAdminLink.path"
      :to="`/job-posts/${jobPostId}/admin/${jobPostAdminLink.path}`"
    >
      {{ jobPostAdminLink.name }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import jobPostAdminLinks from '~/lib/links/jobPostAdminLinks';

const { id: jobPostId } = useRoute().params;
</script>
