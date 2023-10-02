<template>
  <div>
    <Form
      @submit="handleCreateJobPost"
      :validation-schema="veeValidateZodSchema"
    >
      <label>Add title</label>
      <Field type="text" name="title" />
      <ErrorMessage name="title" />
      <button type="submit">Create Job Post</button>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import createJobPostSchema from "~/models/jobPost/validators/createJobPost.schema";

const veeValidateZodSchema = toTypedSchema(createJobPostSchema);

function handleCreateJobPost(values: any) {
  alert(JSON.stringify(values, null, 2));
}
</script>
