<script setup>
import { defineEmits, defineProps } from 'vue';
const props = defineProps({
    placeholder: {
        type: String,
        required: false,
        default: ""
    },
    type: {
        type: String,
        required: false,
        default: "text"
    },
    modelValue: {
        type: String
    }
})

const emit = defineEmits(['enter', 'update:modelValue'])
</script>
<template>
    <input
        v-if="props.type === 'radio' || props.type === 'checkbox'"
        :type="props.type"
        :value="props.modelValue"
        @change="(e) => emit('update:modelValue', e.target.value)"
    />
    <input
        v-else
        :type="props.type"
        class="input"
        :placeholder="props.placeholder"
        :value="props.modelValue"
        @input="(e) => emit('update:modelValue', e.target.value)"
        @keyup.enter="(e) => emit('enter', e)"
    />
</template>

<style lang="scss" scoped>
@import "../assets/scss";
.input[type="text"] {
    padding: 14px 24px;
    width: 100%;
    border-radius: 20px;
    font-size: 1.4rem;
    line-height: 1.4;
    color: $text-color;
}
</style>