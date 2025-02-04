<script setup lang="ts">
import type { NuxtError } from '#app';
import { CircleAlert } from 'lucide-vue-next';

const props = defineProps({
    error: Object as () => NuxtError
})

</script>

<template>
    <NuxtLayout>
        <main class="bg-oct-green flex items-center justify-center min-h-screen px-4">
            <div class="bg-white flex flex-col gap-2 px-4 py-2 rounded-md shadow-xl md:max-w-md">
                <div class="my-2">
                    <img src="~/assets/images/logo/gradex-default-inverted.svg" class="dark:invisible block visible dark:hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                    <img src="~/assets/images/logo/gradex-default.svg" class="dark:visible dark:block invisible hidden" alt="Logo of the system. Grade with a styled X" width="240"  />
                </div>
                <div class="mt-2 flex flex-col items-center justify-center gap-2">
                    <div class="text-center">
                        <span class="flex items-center justify-center gap-2 text-red-500">
                            <CircleAlert :size="32" />
                            <span class="text-3xl font-serif text-oct-othagreen font-medium">An error occured</span>
                        </span>
                        <h1 class="text-xl font-mono text-oct-green font-bold tracking-tighter">Error code {{ props.error?.statusCode }}</h1>
                    </div>
                    <div class="text-center">
                        <div v-if="props.error?.statusCode === 404">
                            <p>The requested resource is either deleted or moved to another location. Please check the link, then try again.</p>
                        </div>
                        <NuxtLink href="/" class="text-oct-green hover:underline">&larr; Return to dashboard.</NuxtLink>
                    </div>
                    <div class="mt-4 text-sm font-mono text-xs text-center">
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
    </NuxtLayout>
</template>