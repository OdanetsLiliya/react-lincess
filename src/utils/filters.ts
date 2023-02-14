import { FilterCommonType, FilterType } from '../types/filterTypes';

export const getFilterArray = (arr: Array<FilterCommonType>) => {
    return arr.map((item: FilterCommonType) => getFilterItem(item))
}

export const getFilterItem = (item: FilterCommonType) => {
    return ({
        label: item.title,
        value: item.id
    }) as FilterType
}

export const getFiltersToSet = (
    arrayData: FilterType[],
) => {
    let filtersToSet: any = {};
    arrayData.forEach((arrayItem) =>
      filtersToSet[arrayItem.value] = false
    );
    return filtersToSet
}