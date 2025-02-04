<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
        <div class="bg-white dark:bg-slate-950 px-8 py-6 rounded-lg md:min-w-96 md:max-w-md">
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
                <UsernameField name="username" type="text" label="pw_reset.label" placeholder="totenator or 202S-5155" />
                <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.id_number || '') }}</span>
            </div>
            
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
                <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <VueSpinnerTail size="24" color="#fcfcfc" />
                <span>{{ $t('pw_reset.button_action_ongoing') }}</span>
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                {{ $t('pw_reset.button_action') }}
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
import { toast } from 'vue3-toastify';
import UsernameField from '~/components/forms/UsernameField.vue';

const schema = Yup.object().shape({
  username: Yup.string().required('Your username is required.')
})

async function submit(values: any) {
  const runtime = useRuntimeConfig()
  const popup = useNuxtApp().$toast.loading('Sending new invite')
  const data = await $fetch(`${runtime.public.apiUrl}pw-reset`, {
    method: "POST",
    body: {
      username: values.username
    }
  }).catch(error => {
    toast.update(popup, {
      render() {
        return error.data.message || error
      },
      autoClose: true,
      type: 'error',
      isLoading: false,
    })
  })
  useNuxtApp().$toast.update(popup, {
    render() {
      return 'Reset link sent successfully! Please check your school e-mail for the link.'
    },
    autoClose: true,
    type: 'success',
    isLoading: false,
  })
}
</script>