<script setup lang="ts">
const runtime = useRuntimeConfig()

interface Announcement {
  title: string;
  description: string;
  login_image: string;
  content: string;
  createdAt: Date;
  createdBy: object
}

const { data: announcements, refresh } = useFetch<Announcement[]>(`${runtime.public.apiUrl}announcements?limit=25`)

</script>

<template>
    <UCarousel v-slot="{ item }" :items="announcements" class="mt-2">
        <HomecardsAnnouncementCard :title="item.title" :description="item.description" :link="item.content" />
    </UCarousel>
</template>