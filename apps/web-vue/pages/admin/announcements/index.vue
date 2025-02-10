<script setup lang="ts">
import { FormsAnnouncementFileUpload, ModalCreateAnnouncement, ModalEditAnnouncementModal } from '#components'
import ModalDeleteAnnouncement from '~/components/modal/DeleteAnnouncement.vue'

const toast = useToast()
const modal = useModal()
const count = ref(0)
const runtime = useRuntimeConfig()

interface Announcement {
  _id: string;
  title: string;
  description: string;
  login_image: string;
  content: string;
  createdAt: Date;
  createdBy: string
}

const { data: announcements, refresh } = useFetch<Announcement[]>(`${runtime.public.apiUrl}announcements?limit=25`)

function openModal() {
  modal.open(ModalCreateAnnouncement, {
    onSuccess() {
      toast.add({
        title: "Announcement created successfully!",
        icon: 'i-lucide-check-big'
      })
      modal.close()
      refresh()
    }
  })
}

function deleteModal(title:string, id:string) {
  modal.open(ModalDeleteAnnouncement, {
    id,
    title,
    onSuccess() {
      toast.add({
        title: "Announcement deleted successfully!",
        icon: 'i-lucide-trash'
      })
      modal.close()
      refresh()
    }
  })
}

function editModal(data: Announcement) {
  modal.open(ModalEditAnnouncementModal, {
    data,
    onSuccess() {
      toast.add({
        title: "Announcement edited successfully!",
        icon: 'i-lucide-check-big'
      })
      modal.close()
      refresh()
    }
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
  <div class="grid md:grid-cols-4 mt-4 gap-3">
    <UCard v-for="item in announcements">
      <template #header>
        <img v-if="item.login_image" :src="item.login_image" alt="item.title" />
        <Placeholder v-else class="h-24" />
      </template>
      <div class="mb-2">
        <h1 class="text-lg font-serif">{{ item.title }}</h1>
      </div>
      <p>{{ item.description }}</p>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <UButton icon="i-lucide-trash" class="bg-red-600 hover:bg-red-700" @click="deleteModal(item.title, item._id)">Delete</UButton>
          <UButton icon="i-lucide-pen-line" type="ghost" @click="editModal(item)">Edit</UButton>
        </div>
      </template>
    </UCard>
  </div>
</template>