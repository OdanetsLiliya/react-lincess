import { FilterCommonType } from "./filterTypes";

export type Workout = {
    id?: string | number
    description: string;
    image_preview_url: string;
    video_preview_url: string;
    sprites_url: string;
    workout_type: FilterCommonType;
    video_url: string;
    title: string,
    coach: FilterCommonType,
    level?: FilterCommonType,
    equipments?:  Array<number>,
    previewTimecode: number,
    outputFile: string
};

