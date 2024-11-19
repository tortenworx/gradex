<script setup lang="ts">
enum ButtonAttrType {
  "button",
  "submit",
  "reset",
  undefined
}

const props = defineProps({
  type: {
    type: String,
    default: "submit"
  },
  color: {
    type: String,
    default: 'oct-lime'
  }
})
</script>

<template>
  <button
  class="
  flex items-center justify-center
  bg-oct-lime
  active:bg-transparent active:ring-2 active:ring-oct-green active:text-oct-green
  hover:shadow-xl transition-all
  px-8 p-3 w-full text-white
  rounded-md">
    <slot></slot>
  </button>
</template>

<style scoped>

</style>