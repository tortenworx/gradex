<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen">
        <div class="bg-white px-8 py-6 rounded-lg md:min-w-96 md:max-w-md">
            <NuxtLink href="/accounts/login" class="text-lime-600">&larr; {{ $t('invitation_resend.return') }}</NuxtLink>
            <div class="my-2">
                <img src="~/assets/images/logo/gradex-default-inverted.svg" alt="Logo of the system. Grade with a styled X" width="240"  />
                <h1 class="text-3xl font-serif text-oct-othagreen font-medium">{{ $t('invitation_resend.title') }}</h1>
                <p class="mt-2 text-gray-600 text-sm">{{ $t('invitation_resend.desc') }}</p>
            </div>
            <Form
            :validation-schema="schema"
            class="flex flex-col gap-2"
            v-slot="{ meta, isSubmitting, errors }"
            @submit="submit"
            >
            <div>
                <IdNumberField name="id_number" type="text" label="invitation_resend.label" placeholder="202S-8483" v-uppercase />
                <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.id_number || '') }}</span>
            </div>
            
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
                <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <VueSpinnerTail size="24" color="#fcfcfc" />
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
import * as Yup from 'yup';
import IdNumberField from '@/components/forms/IdNumberField.vue'
import { VueSpinnerTail } from "vue3-spinners"

const schema = Yup.object().shape({
  id_number: Yup.string().matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, 'invitation_resend.errors.invalid').required("invitation_resend.errors.required"),
  username: Yup.string().required('Your username is required.')
})

async function submit(values: any) {
  console.log(values)
  const popup = useNuxtApp().$toast.loading('Sending new invite')
//   const data = await $fetch('http://localhost:8000/invitation/resend', {
//     method: "POST",
//     body: {
//         id_number: values.id_number.toUpperCase()
//     }
//   }).catch(error => {
//     toast.update(popup, {
//       render() {
//         return error.data.message
//       },
//       autoClose: true,
//       type: 'error',
//       isLoading: false,
//     })
//   })
  useNuxtApp().$toast.update(popup, {
    render() {
      return 'New invite has been sent successfully!'
    },
    autoClose: true,
    type: 'success',
    isLoading: false,
  })
}
</script>