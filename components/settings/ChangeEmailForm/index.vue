<template>
  <Form
    @submit="handleChangeEmail"
    :validation-schema="changeEmailValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="newEmailAddress">New Email address</label>
      <Field type="email" name="newEmailAddress" />
      <ErrorMessage name="newEmailAddress" />
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
      {{ formHandler.pending ? 'Loading...' : 'Change Email' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import changeEmailSchema from '~/models/settings/validators/changeEmailSchema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const changeEmailValidationSchema = toTypedSchema(changeEmailSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleChangeEmail(body: any) {
  const { pending, error } = await useFetch('/api/settings/change-email', {
    method: 'PUT',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully changed email address.';
  }
}
</script>
