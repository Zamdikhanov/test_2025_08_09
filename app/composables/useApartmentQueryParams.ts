import { ref } from "vue";
import { useRoute, useRouter } from "nuxt/app";
import type { IApartmentSortParams } from "~/shared/types/apartment.types";
import type { LocationQueryValue } from "vue-router";

export function useApartmentQueryParams() {
    const route = useRoute();
    const router = useRouter();

    const defaultSortParam: IApartmentSortParams = {
        sortBy: null,
        sortDir: "asc",
    };

    const roomCountArray = ref<number[] | undefined>([]);
    const apartmentAreaRange = ref<[number, number]>();
    const apartmentPriceRange = ref<[number, number]>();
    const apartmentSortParams = ref<IApartmentSortParams>(defaultSortParam);

    roomCountArray.value = parseArray(route.query.roomCountArray);
    apartmentAreaRange.value = parseRange(route.query.apartmentAreaRange);
    apartmentPriceRange.value = parseRange(route.query.apartmentPriceRange);
    apartmentSortParams.value = parseSort(
        route.query.sortBy,
        route.query.sortDir
    );

    function parseRange(
        value: LocationQueryValue | LocationQueryValue[] | undefined
    ): [number, number] | undefined {
        if (typeof value === "string") {
            const parts = value.split("-").map(Number);
            if (
                parts.length === 2 &&
                parts[0] &&
                !isNaN(parts[0]) &&
                parts[1] &&
                !isNaN(parts[1])
            ) {
                return [parts[0], parts[1]];
            }
        }
        return undefined;
    }

    function parseArray(
        value: LocationQueryValue | LocationQueryValue[] | undefined
    ): number[] {
        if (typeof value === "string") {
            const parts = value.split("-").map(Number);
            if (parts.every((el) => !Number.isNaN(el))) {
                return parts;
            }
        }
        return [];
    }

    function parseSort(
        sortBy: LocationQueryValue | LocationQueryValue[] | undefined,
        sortDir: LocationQueryValue | LocationQueryValue[] | undefined
    ): IApartmentSortParams {
        if (
            typeof sortBy === "string" &&
            (sortBy === "area" || sortBy === "floor" || sortBy === "price") &&
            typeof sortDir === "string" &&
            (sortDir === "asc" || sortDir === "desc")
        ) {
            return {
                sortBy: sortBy,
                sortDir: sortDir,
            };
        }
        return defaultSortParam;
    }

    const availableApartmentRoomCountArray = ref<number[]>([]);
    const availableApartmentAreaRange = ref<[number, number] | undefined>();
    const availableApartmentPriceRange = ref<[number, number] | undefined>();

    function updateQueryParams() {
        const newQuery = { ...route.query };

        // Обработка roomCountArray
        const countArray = roomCountArray.value;
        if (countArray?.length) {
            newQuery.roomCountArray = countArray.join("-");
        } else {
            delete newQuery.roomCountArray;
        }

        // Обработка apartmentAreaRange
        const areaValue = apartmentAreaRange.value;
        const availableArea = availableApartmentAreaRange.value;
        if (
            areaValue &&
            availableArea &&
            (areaValue[0] !== availableArea[0] ||
                areaValue[1] !== availableArea[1])
        ) {
            newQuery.apartmentAreaRange = `${areaValue[0]}-${areaValue[1]}`;
        } else {
            delete newQuery.apartmentAreaRange;
        }

        // Обработка apartmentPriceRange
        const priceValue = apartmentPriceRange.value;
        const availablePrice = availableApartmentPriceRange.value;
        if (
            priceValue &&
            availablePrice &&
            (priceValue[0] !== availablePrice[0] ||
                priceValue[1] !== availablePrice[1])
        ) {
            newQuery.apartmentPriceRange = `${priceValue[0]}-${priceValue[1]}`;
        } else {
            delete newQuery.apartmentPriceRange;
        }

        if (apartmentSortParams.value.sortBy === null) {
            delete newQuery.sortBy;
            delete newQuery.sortDir;
        } else {
            newQuery.sortBy = apartmentSortParams.value.sortBy;
            newQuery.sortDir = apartmentSortParams.value.sortDir;
        }

        router.replace({ query: newQuery });
    }

    function resetQueryParams() {
        roomCountArray.value = [];
        apartmentAreaRange.value = availableApartmentAreaRange.value;
        apartmentPriceRange.value = availableApartmentPriceRange.value;
        apartmentSortParams.value = defaultSortParam;
        router.replace({ query: {} });
    }

    return {
        roomCountArray,
        apartmentAreaRange,
        apartmentPriceRange,
        apartmentSortParams,
        availableApartmentAreaRange,
        availableApartmentPriceRange,
        availableApartmentRoomCountArray,
        updateQueryParams,
        resetQueryParams,
    };
}
