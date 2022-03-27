<script setup>
import { onMounted, reactive, inject } from "vue";
import { PokemonItem, Input, Button } from "./"
import { usePokemonStore } from "../store"
const pokemonStore = usePokemonStore();
const modes = reactive([
    {
        value: 'home',
        text: 'Home'
    },
    {
        value: 'homeShiny',
        text: 'Home Shiny'
    },
    {
        value: 'dreamWorld',
        text: 'Dream world'
    },
    {
        value: 'officialArtwork',
        text: 'Official Artwork'
    }
]);

const { mode, updateImageMode } = inject('image-mode');

onMounted(async () => {
    await pokemonStore.fetchPokemonList();
})

function handleSearchPokemon(event) {
    pokemonStore.$patch(state => {
        state.search = event.target.value;
    })
}

async function handleLoadMorePokemon() {
    await pokemonStore.fetchMorePokemon();
}

function handleChangeImageMode(e) {
    updateImageMode(e.target.value)
}
</script>

<template>
    <div class="container">
        <div class="search">
            <Input placeholder="Enter your pokemon name" @enter="handleSearchPokemon"></Input>
            <div class="mode">
                <span v-for="m in modes" :key="m.value">
                    <Input
                        type="radio"
                        name="mode"
                        :value="m.value"
                        :checked="mode === m.value"
                        @change="handleChangeImageMode"
                    ></Input>
                    <span>{{ m.text }}</span>
                </span>
            </div>
        </div>
        <div class="pokemon-list">
            <PokemonItem
                v-for="pokemon in pokemonStore.filteredPokemonList"
                :key="pokemon.name"
                :name="pokemon.name"
                :id="pokemon.id"
                :image-urls="pokemon.imageUrls"
                :mode="mode"
            ></PokemonItem>
        </div>
        <div class="load-more">
            <Button @click="handleLoadMorePokemon">Load more</Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.pokemon-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: $gap36;
    margin: $margin-y 0;
}

.search {
    @include flex(flex-start, center);

    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }
}

.mode {
    flex-direction: row;
    margin-left: 20px;
    width: 600px;
    flex-shrink: 0;
    @include flex(flex-start, center);
    @include tablet {
        margin-top: 16px;
        width: unset;
        flex-wrap: wrap;
    }

    @include mobile {
        margin-top: 20px;
        width: unset;
        flex-wrap: wrap;
    }
    & > span {
        @include flex(flex-start, center);
        @include tablet {
            flex-basis: 50%;
        }
        @include mobile {
            flex-basis: 50%;
        }
        padding: 8px 12px;
        & > span {
            margin-left: 8px;
        }
    }
}
.load-more {
    @include flex(center, center);
}
</style>