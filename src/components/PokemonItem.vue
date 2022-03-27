<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    imageUrls: {
        type: Object,
        required: true
    },
    mode: {
        type: String,
        required: true
    }
});

</script>

<template>
    <div class="card pokemon">
        <div class="pokemon__content">
            <router-link :to="{ name: 'detail', params: { id: props.id } }">
                <div
                    class="pokemon__image"
                    :style="{ backgroundImage: `url(${props.imageUrls[props.mode]})` }"
                ></div>
            </router-link>
            <div class="pokemon__info">
                <router-link :to="{ name: 'detail', params: { id: props.id } }">
                    <h4 class="pokemon__name">{{ props.name }}</h4>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.pokemon {
    &:hover {
        background-color: #f2f2f2;
    }

    &__content {
        display: flex;
        flex-direction: column;

        & > a {
            flex-shrink: 0;
            transform: scale(1);
            transition: transform 0.3s ease;

            &:hover {
                transform: scale(1.15);
            }
        }
    }

    &__image {
        padding-top: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    &__info {
        flex: 1;
        margin-top: auto;
        padding-top: $padding24;
    }

    &__name {
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.8;
        text-align: center;
        text-transform: capitalize;
    }
}
</style>