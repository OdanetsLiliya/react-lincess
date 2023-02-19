export type CoachType = {
    id: number;
    title: string;
    image_url: string;
    about: string;
    details: string;
};

export type CoachesType = {
    items: Array<CoachType>,
    count: number
};