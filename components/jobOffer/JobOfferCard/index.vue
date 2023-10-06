<template>
  <div>
    <p>{{ jobOffer._id }}</p>
  </div>
</template>

<script setup lang="ts">
import IJobOffer from '~/models/jobOffer/interfaces/JobOffer';

const jobOffer = defineProps<IJobOffer>();
</script>
