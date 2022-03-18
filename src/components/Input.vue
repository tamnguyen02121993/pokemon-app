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
    }
})

const emit = defineEmits(['enter'])
</script>
<template>
    <input
        :type="props.type"
        class="input"
        :placeholder="props.placeholder"
        @keyup.enter="(e) => emit('enter', e)"
    />
</template>

<style lang="scss" scoped>
@import "../assets/scss";
.input {
    padding: 14px 24px;
    width: 100%;
    border-radius: 20px;
    font-size: 1.4rem;
    line-height: 1.4;
    color: $text-color;
}
</style>