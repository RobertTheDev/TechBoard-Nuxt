<template>
  <div>
    <h1>Reset Password</h1>
    <ResetPasswordForm />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['is-signed-out'],
});
</script>
