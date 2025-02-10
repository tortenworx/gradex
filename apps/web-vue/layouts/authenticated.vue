<script setup lang="ts">
import { FormsSelection } from '#components';
import { Globe, Menu, X, XIcon } from 'lucide-vue-next';
const { user, clear } = useUserSession()
const isOpen = ref(false)
const router = useRouter()

const avatarItems = [
  [{
    slot: 'account',
    label: '',
    disabled: true
  }], 
  [{
    label: 'Settings',
    icon: 'i-lucide-settings',
    click: () => router.push('/settings')
  }], 
  [{
    label: 'Log Out',
    icon: 'i-lucide-log-out',
    click: () => {
      clear(),
      navigateTo('/accounts/login', { external: true })
    }
  }], 
]
</script>

<template>
    <div>
        <nav class="bg-gradient-to-r from-oct-green to-oct-lime px-4 py-2 flex items-center justify-between">
            <div class="flex gap-2">
              <UButton @click="isOpen = true">
                <Menu />
              </UButton>
                <NuxtLink href="/">
                    <img src="~/assets/images/logo/gradex-solid.svg" alt="" width="186">
                </NuxtLink>
            </div>
            <div>
              <UDropdown :items="avatarItems">
                <UAvatar icon="i-heroicons-photo" :src="user.image" size="lg" />
                <template #account>
                  <div class="flex-1 min-w-0 text-left">
                    <p>
                      Signed in as {{ user?.first_name }} {{ user?.last_name }}
                    </p>
                  </div>
                </template>
              </UDropdown>
            </div>
        </nav>
        <div class="px-4 py-4 min-h-screen">
            <slot></slot>
        </div>
        <div class="bg-lime-950 p-8 grid md:grid-cols-4 gap-4 text-white">
          <div>
            <NuxtLink href="/">
              <img src="~/assets/images/logo/gradex-minified-solid.svg" width="248" />
            </NuxtLink>
            <p class="mt-2">&copy; 2024, {{ $t('footer.rights') }}.</p>
            <p> {{ $t('footer.desc') }} <NuxtLink href="/about" class="text-lime-600 underline">{{ $t('footer.link') }}</NuxtLink></p>
          </div>
            <div class="flex flex-col">
              <h5 class="font-mono text-oct-yellow uppercase">{{ $t('footer.parts.links') }}</h5>
              <a href="https://olivarezcollegetagaytay.edu.ph" target="_blank" class="max-w-fit">Website</a>
              <a href="https://facebook.com/OCTagaytayOfficial" target="_blank" class="max-w-fit">Facebook</a>
              <a href="https://www.facebook.com/oct.shs/" target="_blank" class="max-w-fit">SHS Facebook</a>
            </div>
            <div class="flex flex-col">
              <h5 class="text-oct-yellow uppercase font-mono">{{ $t('footer.parts.services') }}</h5>
              <a href="https://octiensys.com" target="_blank" class="max-w-fit">Student Portal</a>
              <a href="https://119.93.245.104/iensys/" target="_blank" class="max-w-fit">Faculty Portal</a>
              <a href="http://119.93.245.104:8080" target="_blank" class="max-w-fit">eLibrary</a>
            </div>
            <div class="flex flex-col">
              <h5 class="text-oct-yellow uppercase font-mono">{{ $t('footer.parts.infrastructure') }}</h5>
              <a href="mailto:gradex@lyra-research.site" target="_blank" class="max-w-fit">{{ $t('footer.support_email') }}</a>
              <a href="https://gradex.cronitorstatus.com/" target="_blank" class="max-w-fit">{{ $t('footer.status') }}</a>
            </div>
        </div>
        <section class="bg-lime-950 flex items-center justify-center text-sm text-gray-600 px-4">
          <span>Version 0.2.4</span>
        </section>
    </div>
    <USlideover v-model="isOpen" :overlay="false" side="left" class="md:max-w-[25%]">
      <div class="px-4 py-2 flex flex-col gap-2">
        <section class="flex items-center justify-between">
          <h1 class="font-serif text-oct-green dark:text-green-600 text-xl">Menu</h1>
          <UButton @click="isOpen = false">
            <XIcon />
          </UButton>
        </section>
        <section class="flex flex-col gap-2">
          <UButton variant="ghost" color="gray" to="/" icon="i-heroicons-home-20-solid">
            Home
          </UButton>
          <UButton variant="ghost" color="gray" to="/your-report" icon="i-lucide-file-user">
            {{ $t('sidebar.student_grades') }}
          </UButton>
          <UButton variant="ghost" color="gray" to="/classes" icon="i-lucide-presentation">
            {{ $t('sidebar.student_classes') }}
          </UButton>
          <UButton variant="ghost" color="gray" to="/settings" icon="i-heroicons-cog-20-solid">
            {{ $t('sidebar.usr_settings') }}
          </UButton>
          <UButton variant="ghost" color="gray" v-if="user.role == 'SUPERADMIN'" to="/admin/global-variables" icon="i-heroicons-server-20-solid">
            {{ $t('sidebar.global_vars') }}
          </UButton>
        </section>
      </div>
    </USlideover>
</template>