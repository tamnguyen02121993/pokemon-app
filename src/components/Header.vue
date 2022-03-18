<script setup>
</script>

<template>
    <div class="container">
        <div class="header__title">
            <router-link :to="{ name: 'home' }" class="header__link">
                <img src="../assets/images/bg.png" />
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/index.scss";
.header {
    &__title {
        @include flex(center, center);
        margin: $margin-y 0;
    }

    &__link {
        display: inline-block;
        max-width: 600px;
        @include tablet {
            max-width: 450px;
        }

        @include mobile {
            max-width: 300px;
        }
    }
}
</style>