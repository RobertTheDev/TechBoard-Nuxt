<template>
  <Form
    @submit="handleCloseAccount"
    :validation-schema="closeAccountValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="close">Close</label>
      <Field type="text" name="close" />
      <ErrorMessage name="close" />
    </div>

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
      {{ formHandler.pending ? 'Loading...' : 'Close Account' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import closeAccountSchema from '~/models/settings/validators/closeAccountSchema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const closeAccountValidationSchema = toTypedSchema(closeAccountSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleCloseAccount(body: any) {
  const { pending, error } = await useFetch('/api/settings/close-account', {
    method: 'DELETE',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully closed your account.';
  }
}
</script>
