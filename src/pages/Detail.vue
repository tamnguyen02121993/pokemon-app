<script setup>
import { defineProps, ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router"
import { pokemonApi, buildImagePath } from "../services"
import { Button, ImageZoom } from "../components/";

const { mode } = inject('image-mode');
const pokemonDetail = ref(null);
const router = useRouter();
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

onMounted(async () => {
    const { height, weight, stats, name } = await pokemonApi.fetchPokemon(props.id);
    pokemonDetail.value = {
        height,
        weight,
        stats,
        id: props.id,
        name,
        imageUrls: buildImagePath(props.id)
    }
})

function handleBackBtnClick() {
    router.go(-1);
}

</script>

<template>
    <div v-if="Boolean(pokemonDetail)" class="container">
        <div class="card detail">
            <!-- <img
                class="detail__image"
                :src="pokemonDetail.imageUrls[mode]"
                :alt="pokemonDetail.name"
            />-->
            <ImageZoom class="detail__image" :image-url="pokemonDetail.imageUrls[mode]"></ImageZoom>
            <div class="detail__content">
                <div class="detail__info">
                    <span class="detail__field">Name:</span>
                    <span class="detail__value">{{ pokemonDetail.name }}</span>
                </div>
                <div class="detail__info">
                    <span class="detail__field">Height:</span>
                    <span class="detail__value">{{ pokemonDetail.height }}</span>
                </div>
                <div class="detail__info">
                    <span class="detail__field">Weight:</span>
                    <span class="detail__value">{{ pokemonDetail.weight }}</span>
                </div>
                <div v-if="pokemonDetail.stats" class="detail__info">
                    <span class="detail__field">Stats:</span>
                    <span class="detail__value">
                        <ul>
                            <li v-for="s in pokemonDetail.stats" :key="s.stat.name">
                                <span>{{ s.stat.name }}</span>
                                &#40;
                                <span>{{ s.base_stat }}</span>
                                &#41;
                            </li>
                        </ul>
                    </span>
                </div>
                <Button @click="handleBackBtnClick" class="detail__btn" theme-button>Back</Button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss";
.detail {
    @include flex(flex-start, flex-start);
    margin: $margin-y 0;

    @include tablet {
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    @include mobile {
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    &__image {
        max-width: 350px;
        flex-shrink: 0;

        @include tablet {
            max-width: 300px;
        }

        @include mobile {
            max-width: unset;
        }
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: $padding16;
    }

    &__info {
        @include flex(flex-start, flex-start);
    }

    &__field,
    &__value {
        font-size: 1.4rem;
        line-height: 1.8;
    }

    &__field {
        width: 140px;
        flex-shrink: 0;
    }

    &__value {
        flex: 1;
        text-transform: capitalize;
    }

    &__btn {
        margin-top: 20px;
    }
}
</style>