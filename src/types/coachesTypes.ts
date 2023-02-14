export type CoachType = {
    id: number | string;
    title: string;
    image_url: string;
    about: string | null;
    details: string | null;
};

export type CoachesType = {
    items: Array<CoachType>,
    count: number
};