export type TSortDir = "asc" | "desc";
export type TApartmentSortedBy = "area" | "floor" | "price" | null;

export interface IApartmentSortParams {
    sortBy: TApartmentSortedBy;
    sortDir: TSortDir;
}

export interface IApartmentFilters {
    areaRange?: [number, number];
    priceRange?: [number, number];
    roomCountArray: number[];
}

export interface IApartment {
    id: number;
    title: string;
    roomCount: number;
    area: number;
    floor: number;
    numberOfFloors: number;
    price: number;
    image: string;
}

export interface IApiRequestGetApartments {
    apartmentSortParams: IApartmentSortParams;
    apartmentFilters: IApartmentFilters;
    page: number;
}

export interface IApartmentAvailableFiltersRange {
    availableAreaRange: [number, number];
    availablePriceRange: [number, number];
    availableRoomCountArray: number[];
}

export interface IApiResponseGetApartments {
    data: IApartment[];
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
    availableFilters: IApartmentAvailableFiltersRange;
}
