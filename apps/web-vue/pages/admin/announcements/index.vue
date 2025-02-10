<script setup lang="ts">
import { FormsAnnouncementFileUpload, ModalCreateAnnouncement } from '#components'

const toast = useToast()
const modal = useModal()
const count = ref(0)

function openModal() {
  count.value += 1
  modal.open(ModalCreateAnnouncement, {
  })
}

definePageMeta({
    layout: 'authenticated'
})

</script>


<template>
  <div class="flex items-center justify-between">
    <h1 class="text-3xl font-serif font-medium text-oct-green dark:text-lime-500">
      Announcements
    </h1>
    <UButton label="Create" icon="i-lucide-square-pen" @click="openModal" />
  </div>
</template>