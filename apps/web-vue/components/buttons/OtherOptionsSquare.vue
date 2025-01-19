<script setup lang="ts">
import { ref } from 'vue'
import {
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from 'radix-vue'
import { EllipsisVertical } from 'lucide-vue-next';

const toggleState = ref(false)

</script>

<template>
    <DropdownMenuRoot v-model:open="toggleState">
        <DropdownMenuTrigger class="max-w-fit p-2 border-2 border-slate-800 border-opacity-50 shadow-lg rounded bg-white">
            <EllipsisVertical :size="16" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
            <DropdownMenuContent class="absolute -top-10 right-5 border-2 border-slate-800 border-opacity-60 shadow-md bg-white min-w-48 rounded-lg mt-2">
                <slot />
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>