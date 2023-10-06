<template>
  <div>
    <p>{{ profile._id }}</p>
  </div>
</template>

<script setup lang="ts">
import IProfile from '~/models/profile/interfaces/Profile';

const profile = defineProps<IProfile>();
</script>
