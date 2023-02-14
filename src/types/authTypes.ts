export type UserType = {
    id: number | string;
    username: string | null;
    email: string;
};

export type UserSignUpType = {
    username: string | null;
    email: string;
    password: string | null;
    key: string | null;
};

export type UserSignUpResponseType = {
    id: number | string;
    username: string | null;
    email: string;
    password: string | null;
};

export type TokensType = {
    accessToken: string;
    refreshToken: string;
    accessExpiryDate: string;
};