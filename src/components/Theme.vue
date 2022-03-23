<script setup>
import { ref, inject } from "vue";
import { themeData } from "../services";

const { theme, updateThemeData } = inject('theme');
const isOpening = ref(false);
const themes = ref(themeData);
const themeName = ref(theme.value.name);

function handleOpenThemeManage() {
  isOpening.value = !isOpening.value;
}

function handleSelectThemeItem(theme) {
  document.body.style.backgroundImage = theme.background;
  themeName.value = theme.name;
  updateThemeData(theme.name);
}

</script>

<template>
  <Teleport to="body">
    <div :class="['theme__icon', { 'active': isOpening }]" @click="handleOpenThemeManage">
      <ion-icon name="settings-outline" class="icon-36px"></ion-icon>
    </div>
    <div :class="['theme__container', { 'active': isOpening }]">
      <h4 class="theme__name">{{ themeName }}</h4>
      <div class="theme__content">
        <div
          v-for="theme in themes"
          :key="theme.name"
          :class="['theme__item', { 'active': theme.name === themeName }]"
          :style="{ backgroundImage: theme.background }"
          @click="handleSelectThemeItem(theme)"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";

.theme {
  $width: 300px;
  $height: 300px;
  $bottom: 40px;
  $shadow: rgba(0, 0, 0, 0.3) 0px 3px;

  &__container {
    position: fixed;
    bottom: $bottom;
    right: 0;
    width: $width;
    height: $height;
    padding: 16px;
    background-color: $white;
    transform: translateX($width);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 4px;
    box-shadow: $shadow;
    @include mobile {
      display: none;
    }

    &.active {
      transform: translateX(0);
    }
  }

  &__icon {
    position: fixed;
    bottom: $bottom;
    right: $width;
    padding: 8px 12px;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    box-shadow: $shadow;
    background: $white;
    transform: translateX($width);
    transition: transform 0.3s ease;
    @include mobile {
      display: none;
    }

    & .icon-36px {
      cursor: pointer;
      transform: rotate(0deg);
      transition: transform 0.3s ease;
      &:hover {
        transform: rotate(180deg);
      }
    }

    &.active {
      transform: translateX(0);
    }
  }

  &__name {
    text-align: center;
    padding: 8px 0;
    display: block;
    margin-bottom: 8px;
    flex-shrink: 0;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
    gap: 12px;
    margin-bottom: 8px;
    flex: 1;
    overflow-y: auto;
  }

  &__item {
    width: 100%;
    padding-top: 100%;
    background-clip: padding-box;
    cursor: pointer;
    border-radius: 4px;
    border: 2px solid transparent;

    &.active {
      border: 2px solid #2f6db4;
    }
  }
}
</style>