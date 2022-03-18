<script setup>
import { ref, onMounted } from "vue";
import { PokemonItem, Input } from "./"
import { pokemonApi } from "../services";
const pokemonList = ref([]);
const filterList = ref([]);

onMounted(async () => {
    const data = await pokemonApi.fetchPokemonList();
    pokemonList.value = data;
    filterList.value = data;
})

function handleSearchPokemon(event) {
    if (event.target.value === "") {
        filterList.value = pokemonList.value;
        return;
    }

    filterList.value = pokemonList.value.filter(x => x.name.includes(event.target.value))
}
</script>

<template>
    <div class="container">
        <div class="search">
            <Input placeholder="Enter your pokemon name" @enter="handleSearchPokemon"></Input>
        </div>
        <div class="pokemon-list">
            <PokemonItem
                v-for="pokemon in filterList"
                :key="pokemon.name"
                :name="pokemon.name"
                :id="pokemon.id"
                :image-urls="pokemon.imageUrls"
            ></PokemonItem>
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
</style>