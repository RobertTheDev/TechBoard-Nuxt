<template>
  <button
    v-if="!formHandler.successMessage"
    @click="handleSendEmailVerification"
    :disabled="formHandler.pending"
  >
    {{ formHandler.pending ? 'Loading...' : 'Send Email Verification' }}
  </button>
  <p v-if="formHandler.successMessage">{{ formHandler.successMessage }}</p>
  <p v-if="formHandler.errorMessage">{{ formHandler.errorMessage }}</p>
</template>

<script lang="ts" setup>
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleSendEmailVerification(body: any) {
  const { pending, error } = await useFetch(
    '/api/settings/verify-email/send-token',
    {
      method: 'POST',
    },
  );
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage =
      'Successfully sent email verification token.';
  }
}
</script>
