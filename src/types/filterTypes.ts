import { DictType } from "./dictTypes";

export type FilterType = {
    value: number | string;
    label: string;
};

export type FilterCommonType = {
    id: number | string;
    title: string;
};

export type SelectedFiltersType = {
    levels: DictType,
    equipments: DictType,
    workoutTypes: DictType,
    page: number,
    take: number;
}

export type UpdateSelectedFiltersType = {
    levels?: DictType,
    equipments?: DictType,
    workoutTypes?: DictType,
    page?: number,
    take?: number;
}

