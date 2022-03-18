<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, provide } from "vue";
import { themeData } from "./services";

const theme = ref(themeData[0]);
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
  <router-view></router-view>
</template>
