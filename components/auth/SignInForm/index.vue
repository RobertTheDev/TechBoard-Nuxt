<template>
  <Form
    @submit="handleSignIn"
    :validation-schema="signInValidationSchema"
    class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
  >
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="emailAddress"
      >
        Email Address
      </label>
      <Field
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="email"
        name="emailAddress"
        placeholder="Email address"
      />
      <ErrorMessage class="text-red-500 text-xs italic" name="emailAddress" />
    </div>

    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
        >Password</label
      >
      <Field
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        name="password"
        placeholder="Password"
      />

      <ErrorMessage class="text-red-500 text-xs italic" name="password" />
    </div>
    <div>
      <NuxtLink
        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        to="/auth/forgot-password"
        >Forgot password?</NuxtLink
      >
      <p v-if="formHandler.errorMessage" class="text-red-500 text-xs italic">
        {{ formHandler.errorMessage }}
      </p>
      <p
        v-if="formHandler.successMessage"
        class="text-green-500 text-xs italic"
      >
        {{ formHandler.successMessage }}
      </p>
    </div>

    <NuxtLink
      class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
      to="/auth/sign-up"
      >Don't have an account? Sign Up.</NuxtLink
    >

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
      :disabled="formHandler.pending"
    >
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
