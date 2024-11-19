<script setup>
//imports
import * as toast from "@zag-js/toast"
import { normalizeProps, useActor, useMachine } from "@zag-js/vue"
import { computed, inject, reactive } from "vue"

// 1. Create the single toast
const props = defineProps({
    actor: string
})
const [state, send] = useActor(props.actor)
const api = computed(() => toast.connect(state.value, send, normalizeProps))
</script>
<template>
    <div v-bind="api.getRootProps()">
      <h3 v-bind="api.getTitleProps()">{{ api.title }}</h3>
      <p v-bind="api.getDescriptionProps()">{{ api.description }}</p>
      <button @click="api.dismiss()">Close</button>
    </div>
</template>