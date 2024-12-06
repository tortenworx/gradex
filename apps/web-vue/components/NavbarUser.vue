<script setup lang="ts">
import * as menu from '@zag-js/menu'
import { normalizeProps, useMachine } from '@zag-js/vue';
import { computed } from 'vue';
import { User } from 'lucide-vue-next';

defineProps({
  user: {
    required: true,
  },
  logOut: {
    required: true
  }
})

const [state, send] = useMachine(menu.machine({ id: "1", "aria-label": "User" }));
const api = computed(() => menu.connect(state.value, send, normalizeProps))
</script>

<template>
  <div ref="ref">
    <button v-bind="api.getTriggerProps()" class="bg-white rounded-full p-3">
        <User />
    </button>
    <div v-bind="api.getPositionerProps()" class="rounded-md py-2 bg-white w-1/2 md:w-1/6">
      <ul v-bind="api.getContentProps()" class="flex flex-col gap-1">
        <div class="mb-2">
          {{ user.name }}
        </div>
        <li v-bind="api.getItemProps({ value: 'home' })" class="data-[highlighted]:data-[part=item]:bg-oct-othagreen data-[highlighted]:data-[part=item]:text-white px-4 text-lg">Home</li>
        <li v-bind="api.getItemProps({ value: 'settings' })" class="data-[highlighted]:data-[part=item]:bg-oct-othagreen data-[highlighted]:data-[part=item]:text-white px-4 text-lg">Settings</li>
        <li v-bind="api.getItemProps({ value: 'language' })" class="data-[highlighted]:data-[part=item]:bg-oct-othagreen data-[highlighted]:data-[part=item]:text-white px-4 text-lg">Language</li>
        <hr v-bind="api.getSeparatorProps()" />
        <li v-bind="api.getItemProps({ value: 'logout' })" class="data-[highlighted]:data-[part=item]:bg-red-600 data-[highlighted]:data-[part=item]:text-white px-4 text-lg">Log-out</li>
      </ul>
    </div>
  </div>
</template>