<script setup>
import { ref } from "vue";
const isOpening = ref(false);
</script>

<template>
  <Teleport to="body">
    <div class="theme__container">
      <span class="material-icons-outlined md-36">settings</span>
    </div>
  </Teleport>
</template>

<style lang="scss">
@import "../assets/scss/index.scss";

.theme {
  &__container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 8px 12px;
    background: $white;
  }
}
</style>