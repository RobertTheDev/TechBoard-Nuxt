<template>
  <Form
    @submit="handleEditCompany"
    :validation-schema="editCompanyValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="category">Category</label>
      <Field type="text" name="category" placeholder="Category" />
      <ErrorMessage name="category" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="coverImageUrl">Cover Image Url</label>
      <Field type="url" name="coverImageUrl" placeholder="Cover Image Url" />
      <ErrorMessage name="coverImageUrl" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="description">Description</label>
      <Field type="text" name="description" placeholder="Description" />
      <ErrorMessage name="description" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="logoUrl">Logo Url</label>
      <Field type="url" name="logoUrl" placeholder="Logo Url" />
      <ErrorMessage name="logoUrl" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="name">Name</label>
      <Field type="text" name="name" placeholder="Name" />
      <ErrorMessage name="name" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="totalEmployees">Total Employees</label>
      <Field type="text" name="totalEmployees" placeholder="Total Employees" />
      <ErrorMessage name="totalEmployees" />
    </div>

    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Edit Company' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import updateCompanySchema from '~/models/company/validators/updateCompany.schema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const editCompanyValidationSchema = toTypedSchema(updateCompanySchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

const { id: companyId } = useRoute().params;

async function handleEditCompany(body: any) {
  const { pending, error } = await useFetch(`/api/companies/${companyId}`, {
    method: 'PUT',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully updated your company.';
  }
}
</script>
