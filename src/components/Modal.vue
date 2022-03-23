<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    showFooter: {
        type: Boolean,
        required: false,
        default: true
    }
})

const emit = defineEmits(['close']);

function handleCloseBtnClick() {
    emit('close')
}

</script>

<template>
    <Teleport to="#app">
        <div :class="['modal', { 'active': props.open }]">
            <div class="modal__overlay"></div>
            <div class="modal__dialog">
                <div class="modal__header">
                    <h2 class="modal__title">{{ props.title }}</h2>
                    <button class="modal__close-btn" @click="handleCloseBtnClick">
                        <ion-icon name="close-outline" class="icon-24px" :id="props.title"></ion-icon>
                    </button>
                </div>
                <div class="modal__content">
                    <slot>Modal Content</slot>
                </div>
                <div class="modal__footer" v-if="showFooter"></div>
            </div>
        </div>
    </Teleport>
</template>

<style lang="scss" scoped>
@import "../assets/scss";
.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    visibility: hidden;
    transition: all 0.3s ease;

    &.active,
    &.active &__dialog {
        opacity: 1;
        visibility: visible;
    }

    &.active &__dialog {
        top: 50%;
    }

    &__overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba($color: $black, $alpha: 0.7);
        z-index: 1000;
    }

    &__dialog {
        position: absolute;
        min-width: 800px;
        min-height: 300px;
        @include tablet {
            width: 600px;
            min-width: unset;
            min-height: unset;
        }
        @include mobile {
            width: 100%;
            min-width: unset;
            min-height: unset;
        }
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.3s ease;
        background: $white;
        opacity: 0;
        visibility: hidden;
        z-index: 1001;
        border-radius: 16px;
        padding: 24px;
    }

    &__header {
        @include flex(space-between, center);
    }

    &__close-btn {
        flex-shrink: 0;
        border-radius: 50%;
        padding: 6px;
        border-radius: 100%;
        background-color: transparent;
        color: $text-color;
        transition: color 0.3s ease;
        &:hover {
            background-color: rgba($color: $text-color, $alpha: 0.08);
        }
    }

    &__title {
        font-size: 1.6rem;
        font-weight: 500;
        line-height: 2;
        flex: 1;
        text-transform: capitalize;
    }

    &__content {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 1.6;
        margin-top: 20px;
    }
}
</style>