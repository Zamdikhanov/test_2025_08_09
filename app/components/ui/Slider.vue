<template>
    <div class="app-slider">
        <div class="app-slider__label">{{ sliderLabel }}</div>
        <div class="app-slider__range">
            <div>
                <span class="app-slider__range-label">от</span>
                <span class="app-slider__range-value">{{
                    formatNumber(range?.[0] ?? 0)
                }}</span>
            </div>
            <div>
                <span class="app-slider__range-label">до</span>
                <span class="app-slider__range-value">{{
                    formatNumber(range?.[1] ?? 0)
                }}</span>
            </div>
        </div>
        <SliderRoot
            v-model="range"
            class="SliderRoot"
            :default-value="range"
            :min="availableMin"
            :max="availableMax"
            :step="rangeStep"
            :min-steps-between-thumbs="2"
            @pointerup="handlePointerUp"
            @keyup.left="handlePointerUp"
            @keyup.down="handlePointerUp"
            @keyup.right="handlePointerUp"
            @keyup.up="handlePointerUp"
        >
            <SliderTrack class="SliderTrack">
                <SliderRange class="SliderRange" />
            </SliderTrack>
            <SliderThumb class="SliderThumb" />
            <SliderThumb class="SliderThumb" />
        </SliderRoot>
    </div>
</template>

<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from "reka-ui";

defineProps<{
    sliderLabel: string;
    availableMin: number;
    availableMax: number;
    rangeStep: number;
}>();

const range = defineModel<number[]>("range");
const emit = defineEmits<{ (e: "updateFilters"): void }>();

function handlePointerUp() {
    emit("updateFilters");
}
</script>

<style lang="scss" scoped>
.app-slider__label {
    @include typography-960-p3-regular;
    margin-bottom: 8px;
}
.app-slider__range {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 6px;
}
.app-slider__range-label {
    @include typography-1440-p3-regular;
    opacity: 0.5;
    margin-right: 8px;
}
.app-slider__range-value {
    @include typography-1440-p3-regular;
}
.SliderRoot {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    width: 100%;
    height: 14px;
}
.SliderTrack {
    position: relative;
    flex-grow: 1;
    background-color: var(--color-border);

    width: 100%;
    height: 3px;
    border-radius: 1.5px;
}
.SliderRange {
    position: absolute;
    height: 3px;
    border-radius: 1.5px;
    background-color: var(--color-primary);
}
.SliderThumb {
    cursor: pointer;
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: var(--color-primary);
    /* transform: scale(1);
    transition: var(--transition); */

    &:focus-visible,
    &:hover {
        outline: 2px solid var(--color-primary);
        outline-offset: 3px;
    }
}

@media (min-width: 1440px) {
    .app-slider__label {
        @include typography-1440-p3-regular;
    }
    .app-slider__range {
        margin-bottom: 8px;
    }
    .app-slider__range-label {
        @include typography-1440-p2-regular;
    }
    .app-slider__range-value {
        @include typography-1440-p2-medium;
    }
}
</style>
