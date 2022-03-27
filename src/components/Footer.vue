<script setup>
import { ref, reactive } from "vue";
import { Modal } from "../components";
import info from "../assets/jsons/info.json";
import contact from "../assets/jsons/contact.json";
import skills from "../assets/jsons/skills.json";
import avatar from "../assets/images/avatar.jpg";

const infoData = reactive(info);
const contactData = reactive(contact);
const skillData = reactive(skills);
const githubLink = ref(import.meta.env.VITE_APP_GITHUB);
const apiDocsLink = ref(import.meta.env.VITE_APP_API_DOCS);
const isOpenContactModal = ref(false);
const isOpenAboutModal = ref(false);

function handleOpenModal(type) {
    if (type === 'about') {
        isOpenAboutModal.value = true;
        return;
    }
    isOpenContactModal.value = true;
}
</script>

<template>
    <div class="container">
        <div class="footer">
            <div class="footer__navigation">
                <a :href="apiDocsLink" target="_blank" class="navigation__item">API Docs</a>
                <div class="navigation__item" @click="handleOpenModal('about')">about me</div>
                <div class="navigation__item" @click="handleOpenModal('contact')">contact me</div>
            </div>
            <div class="footer__copyright">
                &copy; Copyright by
                <a
                    :href="githubLink"
                    target="_blank"
                    class="footer__link"
                >Tam Nguyen</a>
            </div>
        </div>
    </div>
    <Modal :open="isOpenAboutModal" title="About me" @close="() => isOpenAboutModal = false">
        <div class="about">
            <div class="about__avatar">
                <div class="about__image" :style="{ backgroundImage: `url(${avatar})` }"></div>
            </div>
            <div class="about__infos">
                <div
                    class="about__info"
                    v-for="info in infoData"
                    :key="`${info.attribute}-${info.value}`"
                >
                    <span class="about__attr">{{ info.attribute }}:</span>
                    <span class="about__value" v-if="info.attribute === 'Name'">
                        <a :href="githubLink" target="_blank">{{ info.value }}</a>
                    </span>
                    <span class="about__value" v-else>{{ info.value }}</span>
                </div>
            </div>
        </div>
    </Modal>
    <Modal :open="isOpenContactModal" title="Contact me" @close="() => isOpenContactModal = false">
        <div class="contact">
            <div
                class="contact__info"
                v-for="contact in contactData"
                :key="`${contact.attribute}-${contact.value}`"
            >
                <span class="contact__attr">
                    <ion-icon :name="contact.ionicicon" class="contact__icon"></ion-icon>
                    {{ contact.attribute }}
                </span>
                <span class="contact__value">
                    <a
                        :href="contact.attribute === 'Email' ? `mailto:${contact.value}` : contact.value"
                        target="_blank"
                    >{{ contact.value }}</a>
                </span>
            </div>
            <div class="skills">
                <a v-for="s in skillData" :key="`${s.skill}-${s.ionicicon}`">
                    <ion-icon :name="s.ionicicon" class="icon-48px" :title="s.skill"></ion-icon>
                </a>
            </div>
        </div>
    </Modal>
</template>

<style lang="scss" scoped>
@import "../assets/scss";
.footer {
    padding: 16px 0;
    @include flex(space-between, center);
    @include tablet {
        flex-direction: column;
    }
    @include mobile {
        flex-direction: column;
    }
    &__navigation {
        flex: 1;
        @include flex(flex-start, center);
        flex-flow: row;
        @include mobile {
            flex-direction: column;
        }
    }

    &__copyright {
        flex-shrink: 0;
        color: $text-color;
    }
}

.navigation {
    &__item {
        padding: 20px 16px;
        font-size: 1.2rem;
        line-height: 1.4;
        text-transform: capitalize;
        color: $text-color;
        cursor: pointer;

        &:hover {
            color: #888;
        }
    }
}

.about {
    @include flex(flex-start, center);
    @include tablet {
        flex-direction: column;
    }

    @include mobile {
        flex-direction: column;
    }

    &__avatar {
        flex-shrink: 0;
    }

    &__image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 250px;
        padding-top: 100%;
        border-radius: 100%;
        @include tablet {
            width: 150px;
        }
    }

    &__infos {
        flex: 1;
        @include flex(flex-start, flex-start);
        flex-direction: column;
        padding: 8px 20px;
        @include tablet {
            margin-top: 20px;
            padding: 20px;
        }
        @include mobile {
            margin-top: 10px;
            padding: 20px;
        }
    }

    &__info {
        @include flex(flex-start, flex-start);
        color: $text-color;
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.6;
    }

    &__attr {
        width: 160px;
        flex-shrink: 0;
    }

    &__value {
        flex: 1;
        & > a {
            text-decoration: underline;
        }
    }
}

.contact {
    @include flex(flex-start, flex-start);
    flex-direction: column;
    &__info {
        @include flex(flex-start, flex-start);
        @include mobile {
            flex-direction: column;
        }
        color: $text-color;
    }

    &__attr {
        width: 150px;
        flex-shrink: 0;
        @include flex(flex-start, center);
    }

    &__icon {
        font-size: 20px;
        margin-right: 12px;
    }

    &__value {
        flex: 1;
        & > a {
            display: inline-block;
        }
    }
}

.skills {
    @include flex(center, center);
    flex-wrap: wrap;
    width: 100%;
    margin-top: 16px;
    & > a {
        display: inline-block;
        margin-right: 16px;
    }
}
</style>