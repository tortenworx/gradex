<template>
    <main class="grid grid-cols-1 md:grid-cols-3 grid-flow-col min-h-screen">
      <div class="invisible hidden md:visible md:block relative col-span-2 bg-[url('/bg-1.png')] bg-cover bg-center bg-no-repeat min-h-full">
        <div class="absolute top-6 right-6 text-white text-right">
          <h1 class="text-4xl font-bold">Welcome Back Olivarians!</h1>
          <p class="mt-2">Few days away from the NEW School Year and we cannot wait to welcome you all at the campus, Olivarians!</p>
        </div>
      </div>
      <div class="px-4 py-2">
        <div class="mb-4">
          <img src="~/assets/images/logo/gradex-default-inverted.svg" alt="Logo of the system, with the Logo of Olivarez College Tagaytay on the left and the words GradeX on the other." class="max-w-96">
          <h1 class="font-serif text-2xl text-oct-lime">
            {{ $t('login.main') }}
          </h1>
        </div>
        <ButtonsAuthenticateWithGoogle @click="signIn(`google`)" />
        <DividerWithText>or sign in with</DividerWithText>
        <Form
          :validation-schema="schema"
          class="flex flex-col gap-2"
        >
          <TextField name="username" type="text" label="login.username" placeholder="202S-8483" />
          <PasswordField name="password" label="login.password" placeholder="insertpassword" />
          <div class="md:flex items-center justify-center gap-2">
            <ButtonsDefault type="submit" class="mt-4">
              {{ $t('login.submit') }}
            </ButtonsDefault>
            <div class="">
              <NuxtLink href="/accounts/forgot-password">Forgot Password?</NuxtLink>
              <NuxtLink href="/accounts/resend-invitation">Resend Invitation</NuxtLink>
            </div>
          </div>
        </Form>
      </div>
    </main>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate';
import * as Yup from 'yup';
import TextField from '~/components/forms/TextField.vue';
import PasswordField from '~/components/forms/PasswordField.vue';

const { signIn } = useAuth()
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