<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ""
    },
})

const imageRef = ref(null);
const lensRef = ref(null);
const zoomedImgRef = ref(null);
const ratio = ref({
    x: 1,
    y: 1
})

function getCursorPosition(e) {
    let a, x = 0, y = 0;
    const event = e;
    /* Get the x and y positions of the image: */
    a = imageRef.value.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = event.pageX - a.left;
    y = event.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return {
        x, y
    }
}

function handleMoveLens(e) {
    /* Get the cursor's x and y positions: */
    let pos = getCursorPosition(e);
    /* Calculate the position of the lens: */
    let x = pos.x - (lensRef.value.clientWidth / 2);
    let y = pos.y - (lensRef.value.clientHeight / 2);
    /* Prevent the lens from being positioned outside the image: */
    if (x > imageRef.value.width - lensRef.value.clientWidth) {
        x = imageRef.value.width - lensRef.value.clientWidth;
    }
    if (x < 0) {
        x = 0;
    }

    if (y > imageRef.value.height - lensRef.value.clientHeight) {
        y = imageRef.value.height - lensRef.value.clientHeight;
    }
    if (y < 0) {
        y = 0;
    }

    /* Set the position of the lens: */
    lensRef.value.style.left = `${x}px`;
    lensRef.value.style.top = `${y}px`;

    zoomedImgRef.value.style.backgroundPosition = `-${x * ratio.value.x}px -${y * ratio.value.y}px`;
}

function handleLoadedImage() {
    /* Calculate the ratio between result DIV and lens: */
    ratio.value.x = zoomedImgRef.value.clientWidth / lensRef.value.clientWidth;
    ratio.value.y = zoomedImgRef.value.clientHeight / lensRef.value.clientHeight;

    /* Set background properties for the result DIV */
    zoomedImgRef.value.style.backgroundImage = `url(${props.imageUrl})`;
    zoomedImgRef.value.style.backgroundSize = `${imageRef.value.width * ratio.value.x}px ${imageRef.value.height * ratio.value.y}px`;
}

</script>
<template>
    <div class="image-zoom__container">
        <div
            ref="lensRef"
            class="image-zoom__lens"
            @mousemove.prevent="handleMoveLens"
            @touchmove.prevent="handleMoveLens"
        ></div>
        <img
            ref="imageRef"
            :src="props.imageUrl"
            :alt="props.alt"
            class="image-zoom__image"
            @load="handleLoadedImage"
            @mousemove.prevent="handleMoveLens"
            @touchmove.prevent="handleMoveLens"
        />
        <div ref="zoomedImgRef" class="image-zoom__zoomed-img"></div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss";

.image-zoom {
    &__container {
        position: relative;
    }

    &__lens {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        border: 1px solid $red;
        cursor: grab;
        &:hover ~ .image-zoom__zoomed-img {
            visibility: visible;
            opacity: 1;
        }
    }

    &__image {
        cursor: grab;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
    }

    &__zoomed-img {
        position: absolute;
        top: 0;
        left: calc(100% + 10px);
        width: 350px;
        height: 350px;
        background-color: $white;
        border: 1px solid $red;
        border-radius: 8px;
        visibility: hidden;
        opacity: 0;
        transition: all 0.3s ease;

        @include tablet {
            visibility: visible;
            opacity: 1;
            width: 180px;
            height: 180px;
        }

        @include mobile {
            margin-top: 10px;
            position: static;
            width: 100%;
            padding-top: 100%;
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>