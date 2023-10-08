<template>
  <div>
    <p>{{ user.firstName }} {{ user.lastName }}</p>
  </div>
</template>

<script setup lang="ts">
import IProfile from '~/models/profile/interfaces/Profile';

const user = defineProps<IProfile>();
</script>
