<template>
  <Form @submit="handleCreateJobPost" :validation-schema="veeValidateZodSchema">
    <label htmlFor="name">Add name</label>
    <Field type="text" name="name" />
    <ErrorMessage name="name" />

    <label htmlFor="category">Add category</label>
    <Field type="text" name="category" />
    <ErrorMessage name="category" />

    <label htmlFor="coverImageUrl">Add cover image url</label>
    <Field type="url" name="coverImageUrl" />
    <ErrorMessage name="coverImageUrl" />

    <label htmlFor="description">Add description</label>
    <Field type="text" name="description" />
    <ErrorMessage name="description" />

    <label htmlFor="logoUrl">Add logo url</label>
    <Field type="url" name="logoUrl" />
    <ErrorMessage name="logoUrl" />

    <label htmlFor="totalEmployees">Add total employees</label>
    <Field type="text" name="totalEmployees" />
    <ErrorMessage name="totalEmployees" />

    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Create Company' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import createJobPostSchema from '~/models/company/validators/createCompany.schema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const veeValidateZodSchema = toTypedSchema(createJobPostSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleCreateJobPost(body: any) {
  const { pending, error } = await useFetch(`/api/companies`, {
    method: 'POST',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.message;
  } else {
    formHandler.value.successMessage = 'Successfully created company.';
    window.location.reload();
  }
}
</script>
