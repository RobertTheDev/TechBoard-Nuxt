<template>
  <Form @submit="handleSignIn" :validation-schema="signInValidationSchema">
    <label htmlFor="emailAddress">Email address</label>
    <Field type="email" name="emailAddress" />
    <ErrorMessage name="emailAddress" />

    <label htmlFor="password">Password</label>
    <Field type="password" name="password" />
    <NuxtLink to="/auth/forgot-password">Forgot password?</NuxtLink>
    <ErrorMessage name="password" />

    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <NuxtLink to="/auth/sign-up">Don't have an account? Sign Up.</NuxtLink>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Sign In' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import signInSchema from '~/models/auth/validators/signIn.schema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const signInValidationSchema = toTypedSchema(signInSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleSignIn(body: any) {
  const { pending, error } = await useFetch(`/api/auth/sign-in`, {
    method: 'POST',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully signed in.';
    window.location.reload();
  }
}
</script>
