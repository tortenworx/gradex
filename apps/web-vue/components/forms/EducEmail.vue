<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    value: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    successMessage: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
})

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name')
const visible = ref(false)

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>
<script lang="ts">
import { Mail } from 'lucide-vue-next';
</script>

<template>
    <div class="flex flex-col gap-2 container">
        <label :for="name" class="font-bold">{{ $t(label) }}</label>
        <div class="relative w-full">
            <div class="absolute top-0 bottom-0 left-2 flex items-center justify-center text-oct-lime">
                <Mail />
            </div>
        <input
            type="text"
            :id="name"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChange"
            @blur="handleBlur"
            class="block
            w-full
            dark:bg-slate-800
            border-[1px]
            border-gray-800
            dark:border-gray-400
            rounded-md
            pl-9
            pr-[14rem]
            py-2
            focus:ring-oct-lime
            focus:border-oct-lime
            "
            >
            <div class="absolute z-50 top-0 bottom-0 right-2 flex items-center justify-center">
                <span class="text-sm text-gray-600 dark:text-gray-200">@olivarezcollegetagaytay.edu.ph</span>
            </div>
        </div>
    </div>
</template>