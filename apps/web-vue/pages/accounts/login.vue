<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import UsernameField from '~/components/forms/UsernameField.vue';
import PasswordField from '~/components/forms/PasswordField.vue';
import { VueSpinnerTail } from 'vue3-spinners';
const runtime = useRuntimeConfig()

interface Announcement {
  title: string;
  description: string;
  login_image: string;
  content: string;
  createdAt: Date;
  createdBy: object
}
const { data: announcements, refresh } = useFetch<Announcement[]>(`${runtime.public.apiUrl}announcements?limit=5&login=true`)
if (!announcements) refresh()

useHead({
  'title': 'Log-in to your account | GradeX'
})

const schema = Yup.object().shape({
  username: Yup.string().required("login.errors.required"),
  password: Yup.string().min(8, "login.errors.min_8").required("login.errors.required")
})

const carouselRef = ref()

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 3000)
})

</script>
<script lang="ts">
async function submitLogin(values: any) {
  const popup = useNuxtApp().$toast.loading('Signing you in...')
  let signedIn = false
  await $fetch('/api/auth/credentials/authenticate', {
    method: 'POST',
    body: {
      ...values
    }
  }).then(async () => {
    useNuxtApp().$toast.update(popup, {
      render() {
        return 'Log-in success!'
      },
      autoClose: true,
      type: 'success',
      isLoading: false,
    })
    signedIn = true
  }).catch(error => {
    useNuxtApp().$toast.update(popup, {
      render() {
        return error.data.message
      },
      autoClose: true,
      type: 'error',
      isLoading: false,
    })
  })
  if (signedIn) {
    return navigateTo('/', { external: true })
  }
}
</script>
<template>
    <main class="md:grid grid-cols-1 md:grid-cols-3 grid-flow-col min-h-screen dark:bg-slate-950">
      <div class="md:invisible md:hidden">
        <UCarousel v-slot="{ item }" :items="announcements" :ui="{ item: 'basis-full' }" v-if="announcements" ref="carousel-ref" indicators>
          <div class="flex-[0_0_100%] min-w-0 h-full relative text-white mix-blend-overlay bg-gradient-to-br from-oct-othagreen to-transparent">
            <img :src="item.login_image" class="object-fit">
            <div class="absolute md:top-5 md:left-5 bottom-0 left-0 p-4 md:px-0 flex flex-col gap-2 md:w-1/2 text-center bg-gradient-to-t from-green-800 to-transparent">
                <h1 class="text-lg font-bold">
                    {{ item.title }}
                </h1>
                <p class="text-sm">
                    {{ item.description }}
                </p>
            </div>
          </div>
        </UCarousel>
      </div>
      <div class="px-4 py-2">
        <div class="mb-4 max-w-screen">
          <img src="~/assets/images/logo/gradex-default-inverted.svg" alt="Logo of the system, with the Logo of Olivarez College Tagaytay on the left and the words GradeX on the other." class="max-w-96 dark:invisible dark:hidden visible block">
          <img src="~/assets/images/logo/gradex-default.svg" alt="Logo of the system, with the Logo of Olivarez College Tagaytay on the left and the words GradeX on the other." class="max-w-96 dark:visible dark:block invisible hidden">
          <h1 class="font-serif text-2xl text-oct-lime">
            {{ $t('login.main') }}
          </h1>
        </div>
        <ButtonsAuthenticateWithGoogle @click="navigateTo('/auth/google')" />
        <UDivider label="or with username and password" class="my-4" />
        <Form
          :validation-schema="schema"
          class="flex flex-col gap-2"
          v-slot="{ meta, isSubmitting }"
          @submit="submitLogin"
        >
          <UsernameField name="username" type="text" label="login.username" placeholder="202S-8483" />
          <PasswordField name="password" label="login.password" placeholder="**********" />
          <div class="flex flex-col md:flex-row items-center justify-center gap-2 mt-4">
            <ButtonsDefault :disabled="!meta.valid || isSubmitting" type="submit" class="w-full md:w-2/3">
              <div v-if="isSubmitting" class="flex items-center justify-center gap-2">
                <VueSpinnerTail size="24" color="#fcfcfc" />
                <span>Submitting</span>
              </div>
              <div v-else class="flex items-center justify-center gap-2">
                {{ $t('login.submit') }}
              </div>
            </ButtonsDefault>
            <div class="flex w-full md:w-auto md:flex-col items-center justify-between md:justify-center gap-1 text-sm text-gray-600">
                <NuxtLink href="/accounts/resend">Resend Invitation</NuxtLink>
                <NuxtLink href="/accounts/forgot-password">Forgot Password?</NuxtLink>
            </div>
          </div>
        </Form>
        <div class="text-center text-sm text-gray-600 dark:text-gray-200 mt-4">
          <p>&copy; {{ new Date().getFullYear() }} All rights reseved.</p>
          <p>Image rights belongs to their respective owners.</p>
        </div>
      </div>
      <div class="hidden invisible md:visible md:block col-span-2">
        <UCarousel v-slot="{ item }" :items="announcements" :ui="{ item: 'basis-full' }" v-if="announcements" ref="carousel-ref" indicators>
          <div class="flex-[0_0_100%] min-w-0 h-full relative text-white">
            <img :src="item.login_image" class="object-cover w-full h-full">
            <div class="absolute top-0 left-0 p-4 flex flex-col gap-2 bg-gradient-to-br from-green-800 via-transparent to-transparent w-full h-full">
              <div class="w-1/2">
                <div class="mb-2 b ">
                  <h1 class="text-2xl font-bold">
                    {{ item.title }}
                  </h1>
                  <p>
                    {{ item.description }}
                  </p>
                </div>
                <a :href="item.content" target="_blank" referrerpolicy="no-referrer" class="underline underline-offset-2 hover:underline-offset-4 text-lime-200 font-medium text-lg">Read more &rarr;</a>
              </div>
            </div>
          </div>
        </UCarousel>
      </div>
    </main>
</template>