<template>
  <Form
    @submit="handleSendPasswordResetToken"
    :validation-schema="sendPasswordResetTokenValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="emailAddress">Email Address</label>
      <Field type="email" name="emailAddress" />
      <ErrorMessage name="emailAddress" />
    </div>
    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <NuxtLink to="/auth/sign-in">Already have an account? Sign In.</NuxtLink>
    <NuxtLink to="/auth/sign-up">Don't have an account? Sign Up.</NuxtLink>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Send Password Reset' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import IFormHandler from '~/models/configs/interfaces/FormHandler';
import sendPasswordResetTokenSchema from '~/models/auth/validators/sendPasswordResetToken.schema';

const sendPasswordResetTokenValidationSchema = toTypedSchema(
  sendPasswordResetTokenSchema,
);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleSendPasswordResetToken(body: any) {
  const { pending, error } = await useFetch(
    `/api/auth/reset-password/send-token`,
    {
      method: 'POST',
      body,
    },
  );
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage =
      'Successfully sent password reset email.';
  }
}
</script>
