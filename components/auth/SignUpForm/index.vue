<template>
  <Form
    @submit="handleSignUp"
    :validation-schema="signUpValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="emailAddress">Email address</label>
      <Field type="email" name="emailAddress" />
      <ErrorMessage name="emailAddress" />
    </div>
    <div class="flex flex-col">
      <label htmlFor="firstName">First Name</label>
      <Field type="text" name="firstName" />
      <ErrorMessage name="firstName" />
    </div>
    <div class="flex flex-col">
      <label htmlFor="lastName">Last Name</label>
      <Field type="text" name="lastName" />
      <ErrorMessage name="lastName" />
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

    <NuxtLink to="/auth/sign-in">Already have an account? Sign In.</NuxtLink>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Sign Up' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import signUpSchema from '~/models/auth/validators/signUp.schema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const signUpValidationSchema = toTypedSchema(signUpSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleSignUp(body: any) {
  const { pending, error } = await useFetch(`/api/auth/sign-up`, {
    method: 'POST',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully signed up.';
    window.location.reload();
  }
}
</script>
