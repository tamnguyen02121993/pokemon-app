import { defineStore } from "pinia";
import { pokemonApi } from "../services";
import { convertArrToObject } from "./";
export const usePokemonStore = defineStore("pokemon", {
  state: () => {
    return {
      pokemons: {},
      search: "",
    };
  },
  getters: {
    pokemonList: (state) => {
      return Object.values(state.pokemons);
    },
    filteredPokemonList() {
      if (this.search === "") {
        return this.pokemonList;
      }
      return this.pokemonList.filter((x) => x.name.includes(this.search));
    },
  },
  actions: {
    async fetchPokemonList() {
      const data = await pokemonApi.fetchPokemonList();
      this.pokemons = convertArrToObject(data, "id");
    },
    async fetchMorePokemon() {
      const data = await pokemonApi.fetchPokemonList(this.pokemonList.length);
      this.pokemons = { ...this.pokemons, ...convertArrToObject(data, "id") };
    },
  },
});
