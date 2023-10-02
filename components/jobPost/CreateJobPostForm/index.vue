<template>
  <div>
    <Form
      @submit="handleCreateJobPost"
      :validation-schema="veeValidateZodSchema"
    >
      <label htmlFor="title">Add title</label>
      <Field type="text" name="title" />
      <ErrorMessage name="title" />

      <p v-if="formHandler.errorMessage">
        {{ formHandler.errorMessage }}
      </p>
      <p v-if="formHandler.successMessage">
        {{ formHandler.successMessage }}
      </p>

      <button :disabled="formHandler.pending" type="submit">
        {{ formHandler.pending ? "Loading..." : "Create Job Post" }}
      </button>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import createJobPostSchema from "~/models/jobPost/validators/createJobPost.schema";
import IFormHandler from "~/models/configs/interfaces/FormHandler";

const veeValidateZodSchema = toTypedSchema(createJobPostSchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

async function handleCreateJobPost(body: any) {
  const { pending, error } = await useFetch(`/api/job-posts`, {
    method: "POST",
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.message;
  } else {
    formHandler.value.successMessage = "Successfully created job offer.";
  }
}
</script>
