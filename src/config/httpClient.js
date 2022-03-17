import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

httpClient.interceptors.request.use((config) => {
    return config;
})

httpClient.interceptors.response.use((response) => {
    if (response?.data) {
        return response.data;
    }
    return null;
}, (error) => {
    return Promise.reject(error);
})
