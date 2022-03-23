<script setup>
import { ref, provide } from "vue";
import { Theme, Header, Footer } from "../";
import { themeData } from "../../services";

const theme = ref(themeData[0]);
document.body.style.backgroundColor = `unset`;
document.body.style.backgroundImage = theme.value.background;

function updateThemeData(themeName) {
    theme.value = themeData.find(x => x.name === themeName)
}

provide("theme", {
    theme,
    updateThemeData
})
</script>

<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
    <Theme></Theme>
</template>