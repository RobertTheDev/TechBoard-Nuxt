<template>
  <div class="min-w-full flex flex-col items-center p-8">
    <h1>Sign In</h1>
    <SignInForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});
</script>
