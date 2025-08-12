<template>
    <div class="apartment-page">
        <h1 class="apartment-page__title">Подробное описание квартиры</h1>
        <div class="apartment-page__content">
            <NuxtImg
                v-if="apartment"
                :src="apartment.image"
                alt="Планировка квартиры"
                class="apartment__image"
            />

            <div>
                <div v-if="apartment">
                    <div class="apartment__title">{{ "Квартира: " + apartment.title }}</div>
                    <div>
                        {{ "Площадь: " + formatNumber(apartment.area) + " м²" }}
                    </div>
                    <div>
                        {{ "Этаж: " + apartment.floor }}
                        <span>{{ " из " + apartment.numberOfFloors }}</span>
                    </div>
                    <div>
                        {{ "Цена: " + formatNumber(apartment.price) + " ₽" }}
                    </div>
                </div>
                <div class="apartment-page__links">
                    <button
                        type="button"
                        class="app-button"
                        @click="$router.go(-1)"
                    >
                        Назад к списку
                    </button>
                    <nuxt-link
                        to="/"
                        :prefetch-on="{ interaction: true }"
                        class="app-button"
                    >
                        На главную
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";
import { api } from "~/utils/api";
import type { IApartment } from "~/shared/types/apartment.types";

const route = useRoute();
const router = useRouter();

const apartmentId = ref(route.params.id);
const apartment = ref<IApartment | undefined>();

watch(
    () => apartmentId.value,
    async () => {
        const id = apartmentId.value ? +apartmentId.value : null;
        if (id && !isNaN(id)) {
            const { data } = await useAsyncData(
                async () => await api.getApartmentById(id)
            );
            if (!data.value) {
                router.push({ name: "error" });
            }
            apartment.value = data.value;
        } else {
            router.push({ name: "error" });
        }
    },
    { immediate: true }
);
</script>

<style scoped lang="scss">
.apartment-page__title {
    @include typography-1440-h1;
    margin-bottom: 48px;
}
.apartment-page__content {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
}
.apartment__image {
    height: 300px;
    width: 300px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    overflow: clip;
}
.apartment__title {
    @include typography-1440-p2-medium;
}
.apartment-page__links {
    margin-top: 32px;
    display: flex;
    gap: 16px;
}
</style>
