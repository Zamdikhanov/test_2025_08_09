<template>
    <div class="apartment-table-header">
        <div class="apartment-table-header__column-name">Планировка</div>
        <div class="apartment-table-header__column-name">Квартира</div>
        <UiSortButton
            label="S, м²"
            sort-key="area"
            :current-sort-key="sortParams.sortBy"
            :current-sort-dir="sortParams.sortDir"
            :disabled-button="isLoading"
            @update-sort="updateSort"
        />
        <UiSortButton
            label="Этаж"
            sort-key="floor"
            :current-sort-key="sortParams.sortBy"
            :current-sort-dir="sortParams.sortDir"
            :disabled-button="isLoading"
            @update-sort="updateSort"
        />
        <UiSortButton
            label="Цена, ₽"
            sort-key="price"
            :current-sort-key="sortParams.sortBy"
            :current-sort-dir="sortParams.sortDir"
            :disabled-button="isLoading"
            @update-sort="updateSort"
        />
    </div>
</template>

<script setup lang="ts">
import type {
    IApartmentSortParams,
    TApartmentSortedBy,
} from "@/shared/types/apartment.types";

const props = withDefaults(
    defineProps<{
        sortParams: IApartmentSortParams;
        isLoading?: boolean;
    }>(),
    { isLoading: false }
);

const emit = defineEmits<{
    (e: "update:sort-params", sortParams: IApartmentSortParams): void;
}>();

function updateSort(v: { sortedBy: string }) {
    const newSortParams: IApartmentSortParams = { ...props.sortParams };
    if (v.sortedBy === props.sortParams.sortBy) {
        if (newSortParams.sortDir === "asc") {
            newSortParams.sortDir = "desc";
        } else {
            newSortParams.sortBy = null;
        }
    } else {
        newSortParams.sortBy = v.sortedBy as TApartmentSortedBy;
        newSortParams.sortDir = "asc";
    }
    emit("update:sort-params", newSortParams);
}
</script>

<style scoped lang="scss">
.apartment-table-header {
    @include typography-1440-p3-regular;
    width: fit-content;
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 20px;
    padding: 0px 0px 17px;
    border-bottom: 1px solid var(--color-border);
}
.apartment-table-header__column-name {
    display: none;
}
.apartment-table-header__button {
    margin-top: -10px;
    margin-bottom: -10px;
    height: 40px;
    width: fit-content;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
        color: var(--color-primary);
    }
}

@media (min-width: 1440px) {
    .apartment-table-header {
        @include typography-1440-p3-regular;
        width: 100%;
        grid-template-columns: 80px 1fr 120px 120px 120px;
    }
    .apartment-table-header__column-name {
        display: block;
    }
}
</style>
