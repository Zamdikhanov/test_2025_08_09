<template>
    <div class="apartments-page">
        <div class="apartments-page__filter-container">
            <ApartmentsFilter
                v-model:apartment-area-range="apartmentAreaRange"
                v-model:apartment-price-range="apartmentPriceRange"
                v-model:room-count-array="roomCountArray"
                :available-apartment-area-range="availableApartmentAreaRange"
                :available-apartment-price-range="availableApartmentPriceRange"
                :available-apartment-room-count-array="
                    availableApartmentRoomCountArray
                "
                class="apartments-filter"
                @update-filters="handleUpdateFilters"
                @reset-filters="handleResetFilters"
            />
        </div>
        <div class="apartments-page__content-container">
            <h1 class="apartments-page__title">Квартиры</h1>
            <ApartmentsTable
                v-model:sort-params="apartmentSortParams"
                :apartments="apartments"
                :has-more="hasMore"
                :is-loading="isLoading"
                @load-more="handleLoadMore"
                @update:sort-params="handleUpdateFilters"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IApartment } from "@/shared/types/apartment.types";
import { api } from "~/utils/api";

const apartments = ref<IApartment[]>([]);
const currentPage = ref(1);
const hasMore = ref(false);
const isLoading = ref(false);

const {
    roomCountArray,
    apartmentAreaRange,
    apartmentPriceRange,
    apartmentSortParams,
    availableApartmentAreaRange,
    availableApartmentPriceRange,
    availableApartmentRoomCountArray,
    updateQueryParams,
    resetQueryParams,
} = useApartmentQueryParams();

function handleUpdateFilters() {
    currentPage.value = 1;
    updateQueryParams();
    refresh();
}

function handleResetFilters() {
    currentPage.value = 1;
    resetQueryParams();
    refresh();
}

const {
    data: apartmentsFragmentData,
    status,
    refresh,
} = await useAsyncData(async () => {
    return await api.getApartments({
        apartmentSortParams: apartmentSortParams.value,
        apartmentFilters: {
            areaRange: apartmentAreaRange.value,
            priceRange: apartmentPriceRange.value,
            roomCountArray: roomCountArray.value || [],
        },
        page: currentPage.value,
    });
});

watchEffect(() => {
    apartments.value = apartmentsFragmentData.value?.data || [];
    hasMore.value = apartmentsFragmentData.value?.hasMore || false;

    availableApartmentAreaRange.value =
        apartmentsFragmentData.value?.availableFilters.availableAreaRange;
    availableApartmentPriceRange.value =
        apartmentsFragmentData.value?.availableFilters.availablePriceRange;
    availableApartmentRoomCountArray.value =
        apartmentsFragmentData.value?.availableFilters
            .availableRoomCountArray || [];

    apartmentAreaRange.value =
        apartmentAreaRange.value ??
        (apartmentsFragmentData.value?.availableFilters.availableAreaRange
            ? [
                  ...apartmentsFragmentData.value.availableFilters
                      .availableAreaRange,
              ]
            : undefined);

    apartmentPriceRange.value =
        apartmentPriceRange.value ??
        (apartmentsFragmentData.value?.availableFilters.availablePriceRange
            ? [
                  ...apartmentsFragmentData.value.availableFilters
                      .availablePriceRange,
              ]
            : undefined);
});

watchEffect(() => {
    isLoading.value = status.value === "pending";
});

async function handleLoadMore() {
    if (hasMore.value) {
        isLoading.value = true;
        let newApartmentsData;
        try {
            newApartmentsData = await api.getApartments({
                apartmentSortParams: apartmentSortParams.value,
                apartmentFilters: {
                    areaRange: apartmentAreaRange.value,
                    priceRange: apartmentPriceRange.value,
                    roomCountArray: roomCountArray.value || [],
                },
                page: ++currentPage.value,
            });
        } catch (error) {
            console.error("Ошибка:", error);
            currentPage.value--;
        } finally {
            isLoading.value = false;
        }
        if (newApartmentsData) {
            apartments.value.push(...newApartmentsData.data);
            hasMore.value = newApartmentsData.hasMore;
        }
    }
}
</script>

<style scoped lang="scss">
.apartments-page {
    display: grid;
    grid-template-columns: 1fr;
    gap: 28px;
}
.apartments-page__title {
    @include typography-1440-h1;
    margin-bottom: 24px;
}
.apartments-page__content-container {
    order: 2;
}
.apartments-page__filter-container {
    order: 1;
    position: relative;
}
.apartments-filter {
    position: sticky;
    top: 20px;
    right: 0;
    width: 100%;
}

@media (min-width: 960px) {
    .apartments-page {
        grid-template-columns: 1fr 318px;
    }
    .apartments-page__content-container {
        order: 1;
    }
    .apartments-page__filter-container {
        order: 2;
    }
}

@media (min-width: 1440px) {
    .apartments-page {
        display: grid;
        grid-template-columns: 1fr 399px;
        gap: 80px;
    }
    .apartments-page__title {
        margin-bottom: 48px;
    }
    .apartments-page__content-container {
        order: 1;
    }
    .apartments-page__filter-container {
        order: 2;
        position: relative;
    }
    .apartments-filter {
        position: sticky;
        top: 20px;
        right: 0;
        width: 100%;
    }
}
</style>
