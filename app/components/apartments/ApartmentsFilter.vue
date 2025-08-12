<template>
    <div class="apartments-filter">
        <h2 hidden>Фильтр</h2>
        <div class="apartments-filter__buttons-block">
            <button
                v-for="button in buttons"
                :key="button.value"
                :aria-pressed="roomCountArray?.includes(button.value)"
                :aria-label="button.ariaLabel"
                :title="button.ariaLabel"
                :disabled="
                    !availableApartmentRoomCountArray.includes(button.value)
                "
                class="buttons-block__button"
                :class="{
                    'buttons-block__button--pressed': roomCountArray?.includes(
                        button.value
                    ),
                }"
                type="button"
                @click="handleButtonClick(button.value)"
            >
                {{ button.text }}
            </button>
        </div>
        <UiSlider
            v-model:range="apartmentPriceRange"
            :slider-label="'Стоимость квартиры, ₽'"
            :available-min="
                availableApartmentPriceRange
                    ? availableApartmentPriceRange[0]
                    : 0
            "
            :available-max="
                availableApartmentPriceRange
                    ? availableApartmentPriceRange[1]
                    : 0
            "
            :range-step="100_000"
            @update-filters="() => emit('updateFilters')"
        />
        <UiSlider
            v-model:range="apartmentAreaRange"
            :slider-label="'Площадь, м²'"
            :available-min="
                availableApartmentAreaRange ? availableApartmentAreaRange[0] : 0
            "
            :available-max="
                availableApartmentAreaRange ? availableApartmentAreaRange[1] : 0
            "
            :range-step="1"
            @update-filters="() => emit('updateFilters')"
        />
        <button
            class="buttons-block__reset-button"
            type="button"
            @click="resetFilters"
        >
            Сбросить параметры
            <AppIcon name="local-icon:cross-mini" class="reset-button__icon" />
        </button>
    </div>
</template>

<script setup lang="ts">
const buttons = [
    {
        value: 1,
        text: "1к",
        ariaLabel: "1-комнатная квартира",
    },
    {
        value: 2,
        text: "2к",
        ariaLabel: "2-комнатная квартира",
    },
    {
        value: 3,
        text: "3к",
        ariaLabel: "3-комнатная квартира",
    },
    {
        value: 4,
        text: "4к",
        ariaLabel: "4-комнатная квартира",
    },
];

const roomCountArray = defineModel<number[]>("roomCountArray");
const apartmentAreaRange = defineModel<[number, number]>("apartmentAreaRange");
const apartmentPriceRange = defineModel<[number, number]>(
    "apartmentPriceRange"
);

defineProps<{
    availableApartmentAreaRange: [number, number] | undefined;
    availableApartmentPriceRange: [number, number] | undefined;
    availableApartmentRoomCountArray: number[];
}>();

const emit = defineEmits<{
    (e: "updateFilters" | "resetFilters"): void;
}>();

function resetFilters() {
    emit("resetFilters");
}

function handleButtonClick(value: number) {
    if (roomCountArray.value?.includes(value)) {
        roomCountArray.value = roomCountArray.value.filter((v) => v !== value);
    } else {
        roomCountArray.value?.push(value);
    }
    emit("updateFilters");
}
</script>

<style lang="scss" scoped>
.apartments-filter {
    padding: 20px 19px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(
        135deg,
        rgba(174, 228, 178, 0.3) 0%,
        rgba(149, 208, 161, 0.3) 100%
    );
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.apartments-filter__buttons-block {
    display: flex;
    gap: 16px;
}

.buttons-block__button {
    @include typography-1440-p2-regular;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: var(--color-bg);
    border: none;

    &:hover {
        box-shadow: 0px 6px 20px 0px #95d0a1;
    }
    &:hover:disabled {
        box-shadow: none;
    }

    &.buttons-block__button--pressed {
        background-color: var(--color-primary);
        color: var(--color-bg);
    }
}
.buttons-block__reset-button {
    @include typography-960-p3-regular;
    display: flex;
    align-items: center;
    background: none;
    border: 1px solid transparent;
    color: var(--color-text);
    cursor: pointer;
    height: 30px;
    padding: 4px 16px;
    width: fit-content;
    border-radius: 3px;

    &:hover {
        border-color: var(--color-primary);
    }
    .reset-button__icon {
        font-size: 14px;
        width: 8px;
        height: 8px;
        margin-left: 8px;
    }
}

@media (min-width: 1440px) {
    .apartments-filter {
        padding: 40px;
    }
    .buttons-block__reset-button {
        @include typography-1440-p3-regular;
    }
}
</style>
