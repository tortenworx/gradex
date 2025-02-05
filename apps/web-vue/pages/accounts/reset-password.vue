<script setup lang="ts">
const route = useRoute()
const runtime = useRuntimeConfig()
const { data: user } = await useFetch<UserRecord>(`http://localhost:8080/pw-reset/${route.query.id}`)

definePageMeta({
  title: "Reset your password | GradeX"
})

async function submit(values: any) {
  const popup = useNuxtApp().$toast.loading('Sending new invite')
  const data = await $fetch(`${runtime.public.apiUrl}pw-reset`, {
    method: "PATCH",
    body: {
      id: route.query.id,
      new_password: values.confirm_password
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

<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
        <div class="bg-white dark:bg-slate-950 px-8 py-6 rounded-lg md:min-w-96">
          <div v-if="$route.query.id && user !== null">
            <div class="my-2">
                <NuxtLink href="/accounts/login" class="text-lime-600">&larr; {{ $t('pw_reset.return') }}</NuxtLink>
                <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <h1 class="text-3xl font-serif text-oct-othagreen dark:text-green-600 font-medium">{{ $t('new_pw.header') }}</h1>
                <div class="flex gap-2 py-4">
                  <div>
                    <UAvatar icon="i-svg-spinners-eclipse" :src="user?.image" size="lg" />
                  </div>
                  <div>
                    <span>{{ $t('new_pw.greetings') }} {{ user?.first_name }}!</span>
                    <UPopover class="w-fit">
                      <span class="text-lime-600 decoration-dotted w-fit">
                        {{ $t('new_pw.not_you') }}
                      </span>
                      <template #panel>
                        <div class="p-4 w-48">
                          <p>
                            This is most likely a bug. Please close this window and report this issue to the ITC department.
                          </p>
                        </div>
                      </template>
                    </UPopover>
                  </div>
                </div>
          </div>
            <Form
            :validation-schema="schema"
            class="flex flex-col gap-2"
            v-slot="{ meta, isSubmitting, errors }"
            @submit="submit"
            >
            <div>
              <PasswordField name="password" label="New Password" placeholder="**********" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.password || '') }}</span>
            </div>
            <div>
              <PasswordField name="confirm_password" label="Confirm Password" placeholder="**********" />
              <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.confirm_password || '') }}</span>
            </div>
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
                <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <VueSpinnerTail size="24" color="#fcfcfc" />
                <span>{{ $t('new_pw.submitting') }}</span>
                </div>
                <div v-else class="flex items-center justify-center gap-2">
                {{ $t('new_pw.submit') }}
                </div>
            </ButtonsDefault>
            </Form>
          </div>
          <div v-else>
            <div class="my-2">
                <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
            </div>
            <div class="mt-4 flex flex-col items-center justify-center gap-2">
              <span class="text-red-500">
                <CircleAlert :size="32" />
              </span>
              <div class="text-center">
                <h1 class="font-serif text-oct-othagreen font-medium text-2xl">Invalid Password Reset link</h1>
                <p class="mb-4">This password reset link is either invalid or expired. Please check the link from the email and try again.</p>
                <NuxtLink href="/accounts/login" class="text-oct-othagreen">&larr; {{ $t('pw_reset.return') }}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
    </main>
</template>

<script lang="ts">
import * as Yup from 'yup';
import { VueSpinnerTail } from "vue3-spinners"
import { toast } from 'vue3-toastify';
import { CircleAlert } from 'lucide-vue-next'
import PasswordField from '~/components/forms/PasswordField.vue'
import type UserRecord from '~/types/User';

const schema = Yup.object().shape({
  password: Yup.string().required('Your new password is required.').min(8, "new_pw.errors.min_8"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), undefined], "new_pw.errors.match")
})

</script>