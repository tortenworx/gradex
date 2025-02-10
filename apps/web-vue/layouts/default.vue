<template>
    <div>
        <slot />
        <footer class="bg-lime-950 p-8 grid md:grid-cols-4 gap-4 text-white">
            <div>
              <NuxtLink href="/">
                <img src="~/assets/images/logo/gradex-minified-solid.svg" width="248" />
              </NuxtLink>
              <p class="mt-2">&copy; 2024, All rights reserved.</p>
              <p>GradeX is a capstone project made to fullfil the requirements for Practical Research 2.<br>Read more about our research paper <NuxtLink href="/about" class="text-lime-600 underline">here</NuxtLink></p>
            </div>
            <div class="flex flex-col">
              <h5 class="font-mono text-oct-yellow uppercase">Links</h5>
              <a href="https://olivarezcollegetagaytay.edu.ph" target="_blank" class="max-w-fit">Website</a>
              <a href="https://facebook.com/OCTagaytayOfficial" target="_blank" class="max-w-fit">Facebook</a>
              <a href="https://www.facebook.com/oct.shs/" target="_blank" class="max-w-fit">SHS Facebook</a>
            </div>
            <div class="flex flex-col">
              <h5 class="text-oct-yellow uppercase font-mono">Services</h5>
              <a href="https://octiensys.com" target="_blank" class="max-w-fit">Student Portal</a>
              <a href="https://119.93.245.104/iensys/" target="_blank" class="max-w-fit">Faculty Portal</a>
              <a href="http://119.93.245.104:8080" target="_blank" class="max-w-fit">eLibrary</a>
            </div>
            <div class="flex flex-col">
              <div>
                <h5 class="text-oct-yellow uppercase font-mono">Color Mode</h5>
                  <ClientOnly>
                  <UButton
                    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                    color="gray"
                    variant="ghost"
                    aria-label="Theme"
                    @click="isDark = !isDark"
                    class="text-white"
                  >
                  {{ isDark ? "Dark Mode" : "Light Mode" }}
                  </UButton>
                  <template #fallback>
                    <div class="w-8 h-8" />
                  </template>
                </ClientOnly>
              </div>
              <div>
                <h5 class="text-oct-yellow uppercase font-mono">Language</h5>
                <FormsSelection :placeholder="locale == 'en' ? 'English' : 'Filipino'" @change="setLocale($event.target.value)">
                  <template #leading>
                    <Globe />
                  </template>
                  <option disabled>{{ locale == "en" ? "English" : "Filipino" }}</option>
                  <option v-for="locale in availableLocales" :value="locale.code">{{ locale.name }}</option>
                </FormsSelection>
              </div>
              </div>
          <section class="flex items-center justify-center text-sm text-gray-600">
            <span>Version 0.2.8</span>
          </section>
        </footer>
    </div>
</template>
<script setup lang="ts">
import { FormsSelection } from '#components';
import { Globe } from 'lucide-vue-next';
const { locale, locales, setLocale  } = useI18n()
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>