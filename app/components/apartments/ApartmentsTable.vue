<template>
    <div class="apartments-table">
        <ApartmentsTableHeader
            v-model:sort-params="sortParams"
            :is-loading="isLoading"
        />
        <ul v-if="apartments && apartments.length" class="apartment-list">
            <li
                v-for="apartment in apartments"
                :key="apartment.id"
                class="apartment-list__item"
            >
                <ApartmentsTableRow :apartment="apartment" />
            </li>
        </ul>
        <div v-else class="apartment-list-empty">Ничего не найдено</div>
        <button
            v-if="apartments?.length && hasMore"
            :disabled="isLoading"
            class="app-button apartments-table__load-more"
            @click="emit('load-more')"
        >
            Загрузить еще
        </button>
    </div>
</template>

<script setup lang="ts">
import type {
    IApartmentSortParams,
    IApartment,
} from "@/shared/types/apartment.types";

const sortParams = defineModel<IApartmentSortParams>("sortParams", {
    required: true,
});

defineProps<{
    apartments?: IApartment[];
    hasMore?: boolean;
    isLoading?: boolean;
}>();

const emit = defineEmits<{
    (e: "load-more"): void;
}>();
</script>

<style scoped lang="scss">
.apartment-list {
    display: grid;
    gap: 4px;
}
.apartment-list-empty {
    padding: 40px 0px;
    text-align: center;
    color: var(--color-text);
}
.apartments-table__load-more {
    margin-top: 24px;
}

@media (min-width: 1440px) {
    .apartment-list {
        gap: 0px;
    }
    .apartments-table__load-more {
        margin-top: 48px;
    }
}
</style>
