<template>
  <div class="min-w-full flex flex-col items-center p-8">
    <SignInForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});
</script>
