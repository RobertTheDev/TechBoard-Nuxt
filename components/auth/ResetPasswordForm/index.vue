<template>
  <Form
    @submit="handlePasswordReset"
    :validation-schema="resetPasswordValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="password">Password</label>
      <Field type="password" name="password" />
      <ErrorMessage name="password" />
    </div>
    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Reset Password' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import IFormHandler from '~/models/configs/interfaces/FormHandler';
import resetPasswordSchema from '~/models/auth/validators/resetPassword.schema';

const resetPasswordValidationSchema = toTypedSchema(resetPasswordSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

const { passwordResetToken } = useRoute().params;

async function handlePasswordReset(body: any) {
  const { pending, error } = await useFetch(
    `/api/auth/reset-password/${passwordResetToken}`,
    {
      method: 'PUT',
      body,
    },
  );
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully reset password.';
  }
}
</script>
