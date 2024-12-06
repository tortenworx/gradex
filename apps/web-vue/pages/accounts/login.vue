<template>
    <main class="grid grid-cols-1 md:grid-cols-3 grid-flow-col min-h-screen">
      <div class="px-4 py-2">
        <div class="mb-4">
          <img src="~/assets/images/logo/gradex-default-inverted.svg" alt="Logo of the system, with the Logo of Olivarez College Tagaytay on the left and the words GradeX on the other." class="max-w-96">
          <h1 class="font-serif text-2xl text-oct-lime">
            {{ $t('login.main') }}
          </h1>
        </div>
        <ButtonsAuthenticateWithGoogle />
        <DividerWithText>or with username and password</DividerWithText>
        <Form
          :validation-schema="schema"
          class="flex flex-col gap-2"
          v-slot="{ meta }"
        >
          <TextField name="username" type="text" label="login.username" placeholder="202S-8483" />
          <PasswordField name="password" label="login.password" placeholder="**********" />
          <div class="flex items-center justify-between">
              <NuxtLink href="/accounts/resend-invitation">Resend Invitation</NuxtLink>
              <NuxtLink href="/accounts/forgot-password">Forgot Password?</NuxtLink>
          </div>
          <ButtonsDefault :disabled="!meta.valid" type="submit" class="mt-4">
            {{ $t('login.submit') }}
          </ButtonsDefault>
        </Form>
        <div class="text-center text-sm text-gray-600 mt-4">
          <p>&copy; {{ new Date().getFullYear() }} All rights reseved.</p>
          <p>Image rights belongs to their respective owners.</p>
        </div>
      </div>
      <div class="invisible hidden md:visible md:block relative col-span-2 bg-[url('/bg-1.png')] bg-cover bg-center bg-no-repeat min-h-full">
        <div class="absolute top-6 right-6 text-white text-right">
          <h1 class="text-4xl font-bold">Welcome Back Olivarians!</h1>
          <p class="mt-2">Few days away from the NEW School Year and we cannot wait to welcome you all at the campus, Olivarians!</p>
        </div>
      </div>
    </main>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import TextField from '~/components/forms/TextField.vue';
import PasswordField from '~/components/forms/PasswordField.vue';

useHead({
  'title': 'Log-in to GradeX',
})

const schema = Yup.object().shape({
  username: Yup.string().required("login.errors.required"),
  password: Yup.string().min(8, "login.errors.min_8").required("login.errors.required")
})
</script>

<style>
</style>