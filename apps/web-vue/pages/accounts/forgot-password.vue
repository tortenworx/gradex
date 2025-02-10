<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
        <div class="bg-white dark:bg-slate-950 px-8 py-6 rounded-lg md:min-w-md md:max-w-md">
            <NuxtLink href="/accounts/login" class="text-lime-600">&larr; {{ $t('pw_reset.return') }}</NuxtLink>
            <div class="my-2">
                <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <h1 class="text-3xl font-serif text-oct-othagreen dark:text-green-600 font-medium">{{ $t('pw_reset.title') }}</h1>
                <p class="mt-2 text-gray-600 dark:text-gray-400 text-sm">{{ $t('pw_reset.desc') }}</p>
            </div>
            <Form
            :validation-schema="schema"
            class="flex flex-col gap-2"
            v-slot="{ meta, isSubmitting, errors }"
            @submit="submit"
            >
            <div>
                <UsernameField name="username" type="text" label="fields.username_id" placeholder="202S-5155" />
                <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.username || '', { field: 'Username' }) }}</span>
            </div>
            
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
                <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <VueSpinnerTail size="24" color="#fcfcfc" />
                <span>{{ $t('fields.submitting') }}</span>
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                {{ $t('fields.submit') }}
                </div>
            </ButtonsDefault>
            </Form>
        </div>
    </main>
</template>

<script setup lang="ts">
import * as Yup from 'yup';
import { VueSpinnerTail } from "vue3-spinners"
import UsernameField from '~/components/forms/UsernameField.vue';
const toast = useToast()

definePageMeta({
  title: "Request for a password reset | GradeX"
})

const schema = Yup.object().shape({
  username: Yup.string().required('field_errors.required_specialized')
})

async function submit(values: any) {
  const runtime = useRuntimeConfig()
  toast.add({
    id: "password_reset_toast"
  })
  useFetch(`${runtime.public.apiUrl}pw-reset`, {
    method: "POST",
    body: {
      username: values.username
    },
    onRequest() {
      toast.update("password_reset_toast", {
        title: "Sending password reset request...",
        icon: 'i-svg-spinners-eclipse-half',
        closeButton: undefined,
        timeout: 0,
        color: 'blue'
      })
    },
    onRequestError({ error }) {
      toast.remove("password_reset_toast")
      toast.add({
        title: "An error occured.",
        description: error.message,
        icon: 'i-lucide-circle-x',
        color: 'red',
        timeout: 10000
      })
    },
    onResponseError({ response }) {
      toast.remove("password_reset_toast")
      toast.add({
        title: "An error occured.",
        description: response._data.message,
        icon: 'i-lucide-badge-x',
        color: 'red',
        timeout: 10000
      })
    },
    onResponse() {
      toast.update("password_reset_toast", {
        title: "Password request sent!",
        description: 'Instructions on how to reset your password will be sent to your school e-mail address. Make sure that you check your Inbox and Spam folders.',
        icon: 'i-lucide-circle-check-big',
        closeButton: undefined,
        timeout: 3000,
        color: 'green'
      })
    }
  })
}
</script>