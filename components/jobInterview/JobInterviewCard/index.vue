<template>
  <div>
    <p>{{ jobInterview._id }}</p>
  </div>
</template>

<script setup lang="ts">
import IJobInterview from '~/models/jobInterview/interfaces/JobInterview';

const jobInterview = defineProps<IJobInterview>();
</script>
