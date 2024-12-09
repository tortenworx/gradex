<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4 py-2">
        <div class="bg-white px-8 py-6 rounded-lg md:min-w-96 md:max-w-md">
            <NuxtLink href="/accounts/login" class="text-lime-600">&larr; {{ $t('invitation_resend.return') }}</NuxtLink>
            <div class="my-2">
              <img src="~/assets/images/logo/gradex-default-inverted.svg" alt="Logo of the system. Grade with a styled X" width="240"  />
              <h1 class="text-3xl font-serif text-oct-othagreen font-medium">{{ $t('invitation_resend.title') }}</h1>
              <p class="mt-2 text-gray-600 text-sm">{{ $t('invitation_resend.desc') }}</p>
            </div>
            <Form
            :validation-schema="resendSchema"
            class="flex flex-col"
            v-slot="{ meta, isSubmitting, errors }"
            @submit="submit"
            >
            <div>
              <IdNumberField name="id_number" type="text" label="invitation_resend.label" placeholder="202S-8483" />
              <span v-if="meta.dirty && errors" class="text-sm text-red-600">{{ errors.id_number && $t(errors.id_number) }}</span>
            </div>
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
              <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <span>{{ $t('invitation_resend.button_action_ongoing') }}</span>
              </div>
              <div v-else class="flex items-center justify-center gap-2">
                {{ $t('invitation_resend.button_action') }}
              </div>
            </ButtonsDefault>
            </Form>
        </div>
    </main>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import IdNumberField from '@/components/forms/IdNumberField.vue'
import ButtonsDefault from '@/components/buttons/Default.vue';
import { toast } from 'vue3-toastify';

const resendSchema = Yup.object().shape({
  id_number: Yup.string().required("invitation_resend.errors.required").matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, 'invitation_resend.errors.invalid'),
})
</script>

<script lang="ts">
async function submit(values:any) {
  await $fetch('http://localhost:8000/invitation/resend', {
    method: "POST",
    body: {
      id_number: values.id_number.toUpperCase()
    }
  }).then(() => {
    toast.success(
      "Your new invitation has been sent successfully! Please head in to your school email portal\'s INBOX or SPAM folders for the invitation.",
      {
        autoClose: 10000,
      }
    )
  })
.catch(error => {
    toast.error(error.data.message, {
      autoClose: 10000,
    })
  })
}
</script>
