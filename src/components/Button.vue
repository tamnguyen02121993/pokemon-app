<script setup>
import { inject, watchEffect } from "vue";
import { hexToRGB } from "../services"
const { theme } = inject('theme');

watchEffect(() => {
    document.documentElement.style.setProperty('--main-color', hexToRGB(theme.value.colors[0]));
    document.documentElement.style.setProperty('--semi-color', hexToRGB(theme.value.colors[0], 0.8));
})
</script>

<template>
    <button class="btn">
        <slot>Button</slot>
    </button>
</template>
<style lang="scss" scoped>
@import "../assets/scss";
.btn {
    $color: #ffafbd;
    display: inline-block;
    padding: 12px 20px;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.4;
    border-radius: 12px;
    color: $white;
    cursor: pointer;
    transition: all 0.3s ease;
}
</style>

<style lang="css">
.btn {
    background-color: var(--main-color);
    border: 1px solid var(--main-color);
}

.btn:hover {
    background-color: var(--semi-color);
}
</style>