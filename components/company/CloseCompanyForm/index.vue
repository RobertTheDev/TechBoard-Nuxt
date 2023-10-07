<template>
  <Form
    @submit="handleCloseCompany"
    :validation-schema="closeCompanyValidationSchema"
    class="flex flex-col w-72 gap-8"
  >
    <div class="flex flex-col">
      <label htmlFor="confirmDelete">Close Company</label>
      <Field type="text" name="confirmDelete" placeholder="Type DELETE" />
      <ErrorMessage name="confirmDelete" />
    </div>

    <p v-if="formHandler.errorMessage">
      {{ formHandler.errorMessage }}
    </p>
    <p v-if="formHandler.successMessage">
      {{ formHandler.successMessage }}
    </p>

    <button :disabled="formHandler.pending" type="submit">
      {{ formHandler.pending ? 'Loading...' : 'Close Company' }}
    </button>
  </Form>
</template>

<script lang="ts" setup>
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import closeCompanySchema from '~/models/company/validators/closeCompany.schema';
import IFormHandler from '~/models/configs/interfaces/FormHandler';

const closeCompanyValidationSchema = toTypedSchema(closeCompanySchema);

const formHandler = ref<IFormHandler>({
  pending: false,
  errorMessage: undefined,
  successMessage: undefined,
});

const { id: companyId } = useRoute().params;

const router = useRouter();

async function handleCloseCompany(body: any) {
  const { pending, error } = await useFetch(`/api/companies/${companyId}`, {
    method: 'DELETE',
    body,
  });
  if (pending.value) {
    formHandler.value.pending = pending.value;
  } else if (error.value) {
    formHandler.value.errorMessage = error.value.statusMessage;
  } else {
    formHandler.value.successMessage = 'Successfully closed your company.';
    router.push('/profile/my-companies');
  }
}
</script>
