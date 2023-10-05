<template>
  <div class="min-w-full flex flex-col items-center p-8">
    <SignUpForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});
</script>
