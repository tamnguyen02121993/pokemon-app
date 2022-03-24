<script setup>
import { inject, watchEffect, defineProps } from "vue";
import { hexToRGB } from "../services"
const { theme } = inject('theme');
const props = defineProps({
    themeButton: {
        type: Boolean,
        required: false,
        default: false
    }
})

watchEffect(() => {
    document.documentElement.style.setProperty('--main-color', hexToRGB(theme.value.colors[0]));
    document.documentElement.style.setProperty('--semi-color', hexToRGB(theme.value.colors[0], 0.8));
})
</script>

<template>
    <button :class="['btn', { 'btn-theme': props.themeButton }]">
        <slot>Button</slot>
    </button>
</template>
<style lang="scss" scoped>
@import "../assets/scss";
.btn {
    display: inline-block;
    padding: 12px 20px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
    border-radius: 12px;
    color: $white;
    background-color: $red;
    text-transform: capitalize;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba($color: $red, $alpha: 0.8);
    }
}
</style>

<style lang="css">
.btn-theme {
    background-color: var(--main-color);
    border: 1px solid var(--main-color);
}

.btn-theme:hover {
    background-color: var(--semi-color);
}
</style>