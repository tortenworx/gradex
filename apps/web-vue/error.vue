<script setup lang="ts">
import type { NuxtError } from '#app';
import { CircleAlert } from 'lucide-vue-next';

const props = defineProps({
    error: Object as () => NuxtError
})

</script>

<template>
    <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
        <div class="bg-white dark:bg-zinc-900 flex flex-col gap-2 px-4 py-2 rounded-md shadow-xl md:max-w-md">
            <div class="my-2">
                <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
            </div>
            <div v-if="props.error?.statusCode == 404" class="mt-2 flex flex-col items-center justify-center gap-2">
                <div class="text-center flex flex-col gap-2">
                    <h1 class="font-black text-oct-green dark:text-lime-600 text-5xl">404</h1>
                    <span class="text-3xl font-serif text-oct-othagreen dark:text-lime-400 font-medium">Page not found</span>
                </div>
                <div class="text-center">
                    <p>The requested page could not be found. This may be due to a broken link, an incorrect URL, or the page having been removed. Please verify the URL and try again.</p>
                    <div class="my-2">
                        <NuxtLink href="/" class="text-oct-green dark:text-lime-700 hover:underline">&larr; {{ $t('directional.return_to', { page: 'dashboard' }) }}</NuxtLink>
                    </div>
                </div>
            </div>
            <div v-else-if="props.error?.statusCode == 403" class="mt-2 flex flex-col items-center justify-center gap-2">
                <div class="text-center flex flex-col gap-2">
                    <h1 class="font-black text-oct-green text-5xl dark:text-lime-600">403</h1>
                    <span class="text-3xl font-serif text-oct-othagreen dark:text-lime-400 font-medium">Unauthorized</span>
                </div>
                <div class="text-center">
                    <p>You do not have the permissions to access the requested page. Check that you are logged in and is on the right URL.</p>
                    <div class="my-2">
                        <NuxtLink href="/" class="text-oct-green dark:text-lime-700 hover:underline">&larr; {{ $t('directional.return_to', { page: 'dashboard' }) }}</NuxtLink>
                    </div>
                </div>
            </div>
            <div v-else class="mt-2 flex flex-col items-center justify-center gap-2">
                <div class="text-center">
                    <span class="flex items-center justify-center gap-2 text-red-500">
                        <CircleAlert :size="32" />
                        <span class="text-3xl font-serif text-oct-othagreen font-medium">An error occured</span>
                    </span>
                    <h1 class="text-xl font-mono text-oct-green font-bold tracking-tighter">Error code {{ props.error?.statusCode }}</h1>
                </div>
                <div class="text-center">
                    <p>An error occured while processing your reqeust, please try again later.</p>
                    <NuxtLink href="/" class="text-oct-green hover:underline">&larr; Return to dashboard.</NuxtLink>
                </div>
                <div class="mt-4 font-mono text-xs text-center">
                    <span>More information</span>
                    <p>Code: {{ props.error?.statusCode }}</p>
                    <p>Name: {{ props.error?.message }}</p>
                    <p>Message: {{ props.error?.statusMessage }}</p>
                    <p v-if="props.error?.unhandled">Unhandled: {{ props.error?.unhandled }}</p>
                    <p v-if="props.error?.cause">Cause: {{ props.error?.cause }}</p>
                </div>
            </div>
        </div>
    </main>
</template>