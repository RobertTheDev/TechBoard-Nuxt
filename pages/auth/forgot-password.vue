<template>
  <div>
    <h1>Forgot Password?</h1>
    <ForgotPasswordForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});
</script>
