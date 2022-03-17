import { httpClient } from "../config";


export const pokemonApi = {
    fetchPokemonList: async () => {
        const { result } = await httpClient.get("/pokemon")
        return result
    },
    fetchPokemon: async (url) => {
        const { result } = await httpClient.get(url)
        return result
    }
}
