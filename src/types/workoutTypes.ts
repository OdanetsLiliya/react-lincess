export type Workout = {
    id?: string | number
    description: string;
    image_preview_url: string;
    video_preview_url: string;
    sprites_url: string;
    workout_type: string | number;
    video_url: string;
    title: string,
    coach: string | number,
    level?: string | number,
    equipments?:  Array<number>,
    previewTimecode: number,
    outputFile: string
};

