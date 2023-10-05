<template>
  <Form
    @submit="handleUpdateProfile"
    :validation-schema="updateProfileValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="firstName">First Name</label>
      <Field
        type="text"
        name="firstName"
        :placeholder="
          profile && profile.firstName ? profile.firstName : 'First Name'
        "
      />
      <ErrorMessage name="firstName" />
    </div>

    <div class="flex flex-col">
      <label htmlFor="lastName">Last Name</label>
      <Field
        type="text"
        name="lastName"
        :placeholder="
          profile && profile.lastName ? profile.lastName : 'Last Name'
        "
      />
      <ErrorMessage name="lastName" />
    </div>
    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Update Profile' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import updateProfileSchema from '~/models/profile/validators/updateProfileSchema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const updateProfileValidationSchema = toTypedSchema(updateProfileSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleUpdateProfile(body: any) {
  const { pending, error } = await useFetch('/api/profile', {
    method: 'PUT',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully updated your profile.';
    window.location.reload();
  }
}

const {
  data: profile,
  pending,
  error,
  refresh,
} = await useFetch<{
  id: string;
  emailAddress: string;
  firstName: string;
  lastName: string;
}>('/api/profile');
</script>
