import type {
    IApartment,
    IApartmentAvailableFiltersRange,
    IApiRequestGetApartments,
    IApiResponseGetApartments,
} from "~/shared/types/apartment.types";

const API_URL = "http://localhost:3000";

export const api = {
    getApartments: async (payload: IApiRequestGetApartments) => {
        return $fetch<IApiResponseGetApartments>(API_URL + "/apartments.json", {
            method: "GET",
            params: {
                ...payload.apartmentSortParams,
                ...payload.apartmentFilters,
                page: payload.page,
            },
        }).then((response) => {
            const limit = 10;
            const startIndex = (payload.page - 1) * limit;
            const endIndex = startIndex + limit;

            const filterApartments = (apartment: IApartment) => {
                const isInAreaRange =
                    !payload.apartmentFilters.areaRange ||
                    (apartment.area >= payload.apartmentFilters.areaRange[0] &&
                        apartment.area <=
                            payload.apartmentFilters.areaRange[1]);
                const isInPriceRange =
                    !payload.apartmentFilters.priceRange ||
                    (apartment.price >=
                        payload.apartmentFilters.priceRange[0] &&
                        apartment.price <=
                            payload.apartmentFilters.priceRange[1]);
                const isInRoomCountArray =
                    !payload.apartmentFilters.roomCountArray.length ||
                    payload.apartmentFilters.roomCountArray.includes(
                        apartment.roomCount
                    );
                return isInAreaRange && isInPriceRange && isInRoomCountArray;
            };

            const sortApartments = (a: IApartment, b: IApartment) => {
                const first = payload.apartmentSortParams?.sortBy
                    ? a[payload.apartmentSortParams.sortBy]
                    : null;
                const second = payload.apartmentSortParams?.sortBy
                    ? b[payload.apartmentSortParams.sortBy]
                    : null;
                if (first && second) {
                    if (first < second) {
                        return payload.apartmentSortParams.sortDir === "asc"
                            ? -1
                            : 1;
                    }
                    if (first > second) {
                        return payload.apartmentSortParams.sortDir === "asc"
                            ? 1
                            : -1;
                    }
                }
                return 0;
            };

            const availableData = response.data
                .filter(filterApartments)
                .sort(sortApartments);
            const dataToResponse = availableData.slice(startIndex, endIndex);

            const availableFilters: IApartmentAvailableFiltersRange = {
                availableAreaRange: [
                    Math.min(...response.data.map((a) => a.area)),
                    Math.max(...response.data.map((a) => a.area)),
                ],
                availablePriceRange: [
                    Math.min(...response.data.map((a) => a.price)),
                    Math.max(...response.data.map((a) => a.price)),
                ],
                availableRoomCountArray: Array.from(
                    new Set(response.data.map((a) => a.roomCount))
                ),
            };

            const newResponse: IApiResponseGetApartments = {
                data: dataToResponse,
                page: payload.page,
                limit: limit,
                total: availableData.length || 0,
                hasMore: endIndex < availableData?.length,
                availableFilters: availableFilters,
            };

            return newResponse;
        });
    },

    getApartmentById: async (id: number) => {
        return $fetch<{ data: IApartment[] }>(API_URL + `/apartments.json`, {
            method: "GET",
        }).then((response) => {
            return response.data.find((apartment) => apartment.id === id);
        });
    },
};
