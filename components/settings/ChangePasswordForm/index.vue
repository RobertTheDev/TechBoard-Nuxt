<template>
  <Form
    @submit="handleChangePassword"
    :validation-schema="changePasswordValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="currentPassword">Current Password</label>
      <Field type="password" name="currentPassword" />
      <ErrorMessage name="currentPassword" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="newPassword">New Password</label>
      <Field type="password" name="newPassword" />
      <ErrorMessage name="newPassword" />
    </div>
    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Change Password' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import changePasswordSchema from '~/models/settings/validators/changePasswordSchema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const changePasswordValidationSchema = toTypedSchema(changePasswordSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleChangePassword(body: any) {
  const { pending, error } = await useFetch('/api/settings/change-password', {
    method: 'PUT',
    body,
    credentials: 'include',
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully changed password.';
  }
}
</script>
