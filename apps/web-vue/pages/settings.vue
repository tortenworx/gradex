<script setup lang="ts">
import { UButtonGroup } from '#components';
import { Globe } from 'lucide-vue-next';
definePageMeta({
    layout: 'authenticated'
})
const colorMode = useColorMode()
const { locale, locales, setLocale } = useI18n()
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
    <main>
        <h1 class="text-3xl font-serif font-medium text-oct-green dark:text-green-400">Settings</h1>
        <div class="mt-4">
            <section class="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                <div>
                    <h3 class="text-lg font-bold">{{ $t('settings.color_mode') }}</h3>
                    <p>{{ $t('settings.color_mode_help') }}</p>
                </div>
                <div>
                    <UButtonGroup>
                        <UButton icon="i-lucide-sun" :variant="colorMode.value == 'light' ? 'solid' : 'outline'" @click="colorMode.preference = 'light'">
                            <span v-if="colorMode.value == 'light'">
                                {{ $t('settings.color_mode_light') }}
                            </span>
                        </UButton>
                        <UButton icon="i-lucide-moon" :variant="colorMode.value == 'dark' ? 'solid' : 'outline'" @click="colorMode.preference = 'dark'">
                            <span v-if="colorMode.value == 'dark'">
                                {{ $t('settings.color_mode_dark') }}
                            </span>
                        </UButton>
                    </UButtonGroup>
                </div>
            </section>
            <section class="flex flex-col md:flex-row items-start gap-2 md:gap-0 md:items-center justify-between">
                <div>
                    <h3 class="text-lg font-bold">{{ $t('settings.language') }}</h3>
                    <p>{{ $t('settings.language_help') }}</p>
                </div>
                <div class="w-full md:w-48">
                    <FormsSelection :placeholder="locale == 'en' ? 'English' : 'Filipino'" @change="setLocale($event.target.value)">
                    <template #leading>
                        <Globe />
                    </template>
                    <option disabled>{{ locale == "en" ? "English" : "Filipino" }}</option>
                    <option v-for="locale in availableLocales" :value="locale.code">{{ locale.name }}</option>
                    </FormsSelection>
                </div>
            </section>
        </div>
    </main>
</template>