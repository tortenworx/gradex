<script setup lang="ts">
const route = useRoute()
const runtime = useRuntimeConfig()
const { data: user, refresh } = useFetch<UserRecord>(`http://localhost:8080/invitation/resolve/${route.query.key}`)

if (!user) refresh()
console.log(user.value)
definePageMeta({
  title: "Complete your account registration."
})

async function submit(values: any) {
  const popup = useNuxtApp().$toast.loading('Creating your account...')
  const confirmInvite = await $fetch(`${runtime.public.apiUrl}invitation/confirm`, {
    method: "POST",
    body: {
      invitationId: route.query.key,
      id_number: user.value?.id_number,
      credentials: {
        username: values.username,
        password: values.confirm_password
      }
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

const isValidId = reactive({ value: false })

const idSchema = Yup.object().shape({
  id_number: Yup.string().required("invitation_resend.errors.required").matches(/^(\d{3}[S|C]|OCT)-\d{4,}\w?$/g, 'invitation_resend.errors.invalid').oneOf([user.value?.id_number, null], 'Student ID Number does not match the record.'),
})
const schema = Yup.object().shape({
  username: Yup.string().required('Your username is required.').min(3, "Usernames must be 3 characters or more"),
  password: Yup.string().required('Your new password is required.').min(8, "new_pw.errors.min_8"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), undefined], "new_pw.errors.match")
})
</script>

<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
        <div class="bg-white dark:bg-slate-950 px-8 py-6 rounded-lg md:min-w-md md:max-w-md">
          <div v-if="$route.query.key && user !== null">
            <div class="my-2">
                <NuxtLink href="/accounts/login" class="text-lime-600">&larr; {{ $t('pw_reset.return') }}</NuxtLink>
                <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <h1 class="text-3xl font-serif text-oct-othagreen dark:text-green-600 font-medium">Complete your account</h1>
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
                <div v-if="!isValidId">
                  <Form
                  :validation-schema="idSchema"
                  class="flex flex-col"
                  v-slot="{ meta, isSubmitting, errors }"
                  @submit="isValidId.value = true"
                  >
                  <div>
                    <IdNumberField name="id_number" type="text" label="Enter your ID Number in order to continue to confirm it's you." placeholder="202S-8483" />
                    <span v-if="meta.dirty && errors" class="text-sm text-red-600">{{ errors.id_number && $t(errors.id_number) }}</span>
                  </div>
                  <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="mt-4">
                    <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                      <UIcon name="i-svg-spinners-half-circle" />
                      <span>{{ $t('invitation_resend.button_action_ongoing') }}</span>
                    </div>
                    <div v-else class="flex items-center justify-center gap-2">
                      <span>Next Step &rarr;</span>
                    </div>
                  </ButtonsDefault>
                  </Form>
                </div>
                <div v-if="isValidId">
                  <Form
                  :validation-schema="schema"
                  class="flex flex-col gap-2"
                  v-slot="{ meta, isSubmitting, errors, values }"
                  @submit="submit"
                  >
                  <div>
                    <UsernameField name="username" label="Your Username" placeholder="elaine.tito" />
                    <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.username || '') }}</span>
                  </div>
                  <div>
                    <PasswordField name="password" label="New Password" placeholder="**********" />
                    <password-meter :password="values.password" />
                    <span v-if="meta.touched && errors" class="text-sm text-red-600">{{ $t(errors.password || '') }}</span>
                  </div>
                  <div v-if="values.password !== ''">
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
            </div>
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
                <h1 class="font-serif text-oct-othagreen font-medium text-2xl">Invalid Invitation Link</h1>
                <p class="mb-4">This invitation link is either invalid or expired. Please check the link from the email and try again, or request a new invitation using <NuxtLink href="/accounts/resend" class="text-oct-othagreen">this link</NuxtLink></p>
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
import IdNumberField from '~/components/forms/IdNumberField.vue'
import UsernameField from '~/components/forms/UsernameField.vue'
import PasswordField from '~/components/forms/PasswordField.vue'
import PasswordMeter from 'vue-simple-password-meter'
import type UserRecord from '~/types/User';

const schema = Yup.object().shape({
  password: Yup.string().required('Your new password is required.').min(8, "new_pw.errors.min_8"),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), undefined], "new_pw.errors.match")
})

</script>