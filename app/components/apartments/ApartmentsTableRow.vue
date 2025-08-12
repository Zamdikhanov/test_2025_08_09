<template>
    <NuxtLink class="apartment-row" :to="`/apartments/${apartment.id}`">
        <NuxtImg
            :src="apartment.image"
            alt="Планировка квартиры"
            class="apartment-row__image"
        />
        <div class="apartment-row__title">{{ apartment.title }}</div>
        <div class="apartment-row__area">
            {{ formatNumber(apartment.area) }}
            <span class="value-description__param-mobile">м²</span>
        </div>
        <div class="apartment-row__floor">
            {{ apartment.floor }}
            <span>{{ " из " + apartment.numberOfFloors }}</span>
            <span class="value-description__param-mobile">этаж</span>
        </div>
        <div class="apartment-row__price">
            {{ formatNumber(apartment.price) }}
            <span class="value-description__param-mobile">₽</span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { IApartment } from "@/shared/types/apartment.types";

defineProps<{ apartment: IApartment }>();
</script>

<style scoped lang="scss">
.apartment-row {
    position: relative;
    display: grid;
    grid-template-columns: auto auto 1fr 80px;
    grid-template-rows: auto 1fr;
    gap: 16px 20px;
    padding: 15px 23px;
    text-decoration: none;
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 8px;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0px;
        right: 0px;
        bottom: 0;
        background: var(--color-border);
        opacity: 0;
        border-radius: 11px;
        z-index: -1;
        transition: var(--transition);
    }
    &:hover.apartment-row::before {
        opacity: 0.15;
    }
}
.apartment-row__image {
    grid-row: span 2;
    width: 80px;
    height: 80px;
    display: block;
    object-fit: cover;
    order: -1;
}
.apartment-row__title {
    @include typography-1440-p3-regular;
    grid-column: span 3;
    order: -2;
}
.apartment-row__area {
    @include typography-1440-p3-regular;
}
.apartment-row__floor {
    @include typography-1440-p3-regular;
    span {
        opacity: 0.5;
    }
}
.apartment-row__price {
    @include typography-1440-p3-regular;
}

@media (min-width: 1440px) {
    .apartment-row {
        position: relative;
        display: grid;
        grid-template-columns: 80px 1fr 120px 120px 120px;
        grid-template-rows: auto;
        gap: 20px;
        padding: 12px 0;
        text-decoration: none;
        color: var(--color-text);
        border: none;
        border-bottom: 1px solid var(--color-border);
        border-radius: 0px;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -12px;
            right: -12px;
            bottom: 0;
            background: var(--color-border);
            opacity: 0;
            border-radius: 11px;
            z-index: -1;
            transition: var(--transition);
        }
        &:hover.apartment-row::before {
            opacity: 0.15;
        }
    }
    .apartment-row__image {
        grid-row: span 1;
        width: 80px;
        height: 80px;
        display: block;
        object-fit: cover;
        order: 0;
    }
    .apartment-row__title {
        @include typography-1440-p2-medium;
        grid-column: span 1;
        order: 0;
    }
    .apartment-row__area {
        @include typography-1440-p2-regular;
    }
    .apartment-row__floor {
        @include typography-1440-p2-regular;
        span {
            opacity: 0.5;
        }
    }
    .apartment-row__price {
        @include typography-1440-p2-regular;
    }
    .value-description__param-mobile {
        display: none;
    }
}
</style>
