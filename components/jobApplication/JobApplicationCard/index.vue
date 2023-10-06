<template>
  <div>
    <p>{{ jobApplication._id }}</p>
  </div>
</template>

<script setup lang="ts">
import IJobApplication from '~/models/jobApplication/interfaces/JobApplication';

const jobApplication = defineProps<IJobApplication>();
</script>
