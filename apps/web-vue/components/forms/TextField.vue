<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
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
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="name" class="font-bold">{{ $t(label) }}</label>
        <div class="relative w-full">
            <span v-if="$slots.leading">
                <div class="absolute top-0 bottom-0 left-2 flex items-center justify-center text-oct-othagreen">
                    <slot name="leading"></slot>
                </div>
            </span>
            <span v-if="$slots.trailing">
                <div class="absolute top-0 bottom-0 right-2 flex items-center justify-center text-oct-othagreen">
                    <slot name="trailing"></slot>
                </div>
            </span>
        <input
            :type="type"
            :id="name"
            :value="inputValue"
            :placeholder="placeholder"
            @input="handleChange"
            @blur="handleBlur"
            class="block
            w-full
            border-[1px]
            border-gray-800
            rounded-md
            px-2
            py-2
            focus:ring-oct-lime
            focus:border-oct-lime
            "
            v-bind:class="{'pl-10': $slots.leading, 'pr-10': $slots.trailing}"
            >
        </div>
    </div>
</template>